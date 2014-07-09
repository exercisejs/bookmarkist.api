'use strict';

var jwt = require('jsonwebtoken'),
    config = localrequire.config();

var verify = function(token, callback) {
  jwt.verify(token, config.token.secret, {}, function(err, login) {
    if (!err) callback(login);
  });
};

// FOR TEST
// var verify = function(user, callback) {
//   callback({ id: user, email: user });
// };

var io;

module.exports = exports = function(app) {
  var server = require('http').Server(app);
  io = require('socket.io')(server);

  if (process.env.NODE_ENV === 'production') {
    // Enables passing events between nodes.
    // Using socket.io-adapter specifically, socket.io-redis.
    var redis = require('socket.io-redis');
    var config = localrequire.config();
    io.adapter(redis({ host: config.redis.ip, port: config.redis.port }));
  }

  io.on('connection', function(socket) {
    var user;

    var login = function(login) {
      user = login;

      socket.join(user.id);
      console.log('A socket(' + socket.id + ') has joined to:', user.id);

      // FOR TEST
      // io.to(user.id).emit('message', 'test message');
    };

    var logout = function() {
      if (user) {
        socket.leave(user.id);
        console.log('A socket(' + socket.id + ') has left from:', user.id);
        user = undefined;
      }
    };

    socket.on('login', function(token) {
      verify(token, login);
    });

    socket.on('logout', logout);

    socket.on('disconnect', logout);
  });

  return server;
};

exports.send = function(user, type, data) {
  io.to(user).emit(type, data);
};
