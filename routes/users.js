'use strict';

var users = localrequire.controller('users'),
    authentication = localrequire.middleware('authentication'),
    authorization = localrequire.middleware('authorization'),
    preloading = localrequire.middleware('preloading');

module.exports = function(app) {
  app.route('/users')
    .get(
      authentication.requiresLogin,
      users.list
    )
    .post(
      users.create
    );

  app.route('/users/:user')
    .get(
      authentication.requiresLogin,
      users.read
    )
    .put(
      authentication.requiresLogin,
      authorization.isSelf,
      preloading.requiresUser,
      users.update
    )
    .delete(
      authentication.requiresLogin,
      authorization.isSelf,
      preloading.requiresUser,
      users.delete
    );
};
