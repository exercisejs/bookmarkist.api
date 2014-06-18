'use strict';

var jwt = require('jsonwebtoken'),
    User = localrequire.model('user'),
    config = localrequire.config();

exports.list = function(req, res, next) {
  User.list({
    offset: req.query.offset,
    limit: req.query.limit
  }).then(function(users) {
    res.finish({
      users: users
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.read = function(req, res, next) {
  User.read(req.params.user)
  .then(function(user) {
    res.finish({
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
    res.setToken(token);

    res.finish({
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
    res.finish({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.delete = function(req, res, next) {
  User.delete(req.params.user)
  .then(function(user) {
    res.finish({
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
};
