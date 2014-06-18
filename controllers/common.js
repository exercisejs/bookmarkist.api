'use strict';

exports.status = function(req, res, next) {
  res.finish({
    status: 'OK'
  });
};
