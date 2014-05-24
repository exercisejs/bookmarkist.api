'use strict';

exports.status = function(req, res) {
  res.json({
    status: 'OK'
  });
};

exports.notFound = function(req, res, next) {
  next(Error.new({
    code: 'NOT_FOUND',
    message: 'No resource for url:' + req.path + ' is found.'
  }));
};
