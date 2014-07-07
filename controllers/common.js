'use strict';

exports.status = function(req, res) {
  res.finish({
    status: 'OK'
  });
};
