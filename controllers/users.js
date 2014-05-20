'use strict';

var User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config');

exports.list = function(req, res, next) {
  User.list({
    offset: req.query.offset,
    limit: req.query.limit
  }).then(function(users) {
    res.json({
      users: users
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.read = function(req, res, next) {
  User.read(req.params.user)
  .then(function(user) {
    res.json({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.create = function(req, res, next) {
  User.create(req.body)
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

exports.update = function(req, res, next) {
  req.body.id = req.params.user;

  User.update(req.body)
  .then(function(user) {
    res.json({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.delete = function(req, res, next) {
  User.delete(req.params.user)
  .then(function(user) {
    res.json({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};
