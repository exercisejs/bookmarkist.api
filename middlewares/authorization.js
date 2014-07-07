'use strict';

var hasAuthorization = exports.hasAuthorization = function(checker, err) {
  return function(req, res, next) {
    if (!checker(req)) return next(err);
    next();
  };
};

exports.isSelf = hasAuthorization(function(req) {
  return req.params.user === req.login.id;
}, Errors.NotSelf('You are trying to update/delete other user, not you.'));
