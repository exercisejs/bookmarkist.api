'use strict';

var user = process.argv[2] || 'user';
var port = process.argv[3] || '9000';
var disconnect = process.argv[4] || false;

var io = require('socket.io-client');

var socket = io.connect('http://localhost:' + port + '/');

socket.on('connect', function() {
  console.log('Connected to socket.io.');

  socket.emit('login', user);
});

socket.on('message', function(message) {
  console.log('Message:', message);

  if (disconnect) {
    socket.emit('logout');
    socket.disconnect();
  }
});

socket.on('disconnect', function() {
  console.log('Disonnected from socket.io.');
});
