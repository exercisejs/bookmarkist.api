'use strict';

var users = localrequire.controller('users'),
    authentication = localrequire.middleware('authentication'),
    authorization = localrequire.middleware('authorization');

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
      users.update
    )
    .delete(
      authentication.requiresLogin,
      authorization.isSelf,
      users.delete
    );
};
