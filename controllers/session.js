'use strict';

var User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config');

exports.me = function(req, res) {
  var me = req.me;

  res.json({
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

    res.json({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.logout = function(req, res) {
  res.json({});
};
