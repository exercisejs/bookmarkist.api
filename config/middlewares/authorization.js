'use strict';

var jwt = require('jsonwebtoken'),
    config = require('../config');

exports.requiresLogin = function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      jwt.verify(parts[1], config.token.secret, {}, function(err, login) {
        if (err) return next(Error.new({
          code: 'UNAUTHORIZED',
          message: 'The given token is not valid.'
        }));

        req.login = login;

        next();
      });
    } else {
      return next(Error.new({
        code: 'UNAUTHORIZED',
        message: 'The given Authorization header format is bad.'
      }));
    }
  } else {
    return next(Error.new({
      code: 'UNAUTHORIZED',
      message: 'No Authorization header was found.'
    }));
  }
};

var hasAuthorization = exports.hasAuthorization = function(checker, message) {
  return function(req, res, next) {
    if (!checker(req)) {
      return next(Error.new({
        code: 'FORBIDDEN',
        message: message || 'User is not authorized.'
      }));
    }
    next();
  };
};

exports.isSelf = hasAuthorization(function(req) {
  return req.params.user === req.login.id;
}, 'You are trying to update/delete other user, not you.');
