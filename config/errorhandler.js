'use strict';

var status = function(code) {
  switch (code) {
    case 'UNAUTHORIZED':
      return 401;
    case 'FORBIDDEN':
      return 403;
    case 'NOT_FOUND':
      return 404;
    case 'DUPLICATED':
      return 409;
    case 'REQUIRED':
    case 'IMMUTABLE':
      return 422;
    case 'FORMAT_INVALID':
      return 400;
    default:
      return 500;
  }
};

exports = module.exports = function errorHandler() {
  /* jshint unused: false */
  return function errorHandler(err, req, res, next) {
    res.statusCode = status(err.code);
    var error = { message: err.message };
    for (var prop in err) error[prop] = err[prop];
    var json = JSON.stringify({ error: error });
    res.setHeader('Content-Type', 'application/json');
    res.end(json);
  };
};
