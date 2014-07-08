'use strict';

var User = localrequire.service('user');

exports.requiresMe = function(req, res, next) {
  User.read(req.login.id)
  .then(function(user) {
    req.me = user;
    next();
  }).catch(function(err) {
    next(err);
  });
};

exports.requiresUser = function(req, res, next) {
  User.read(req.params.user)
  .then(function(user) {
    req.user = user;
    next();
  }).catch(function(err) {
    next(err);
  });
};
