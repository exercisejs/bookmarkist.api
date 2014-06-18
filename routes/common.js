'use strict';

var common = localrequire.controller('common');

module.exports = function(app) {
  app.route('/status')
    .get(common.status);
};
