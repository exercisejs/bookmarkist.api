'use strict';

var session = localrequire.controller('session'),
    authentication = localrequire.middleware('authentication'),
    preloading = localrequire.middleware('preloading');

module.exports = function(app) {
  app.route('/session')
    .get(
      authentication.requiresLogin,
      preloading.requiresMe,
      session.me
    )
    .post(
      session.login
    )
    .delete(
      authentication.requiresLogin,
      session.logout
    );
};
