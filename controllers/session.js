'use strict';

var jwt = require('jsonwebtoken'),
    User = localrequire.model('user'),
    config = localrequire.config();

exports.me = function(req, res, next) {
  var me = req.me;

  res.finish({
    user: me
  });
};

exports.login = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.authenticate(email, password)
  .then(function(user) {
    var token = jwt.sign({
      id: user.id,
      email: user.email
    }, config.token.secret, {
      expiresInMinutes: config.token.expiresInMinutes
    });

    res.setHeader('Auth-Token', token);
    res.setToken(token);

    res.finish({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.logout = function(req, res, next) {
  res.finish();
};
