'use strict';

var users = require('../controllers/users'),
    common = require('../controllers/common'),
    session = require('../controllers/session'),
    preloading = require('./middlewares/preloading'),
    authorization = require('./middlewares/authorization');

var requiresMe = preloading.requiresMe;
var requiresLogin = authorization.requiresLogin;
var isSelf = authorization.isSelf;

/**
 * Application routes
 */
module.exports = function(app) {
  app.route('/status')
    .get(common.status);

  app.route('/users')
    .get(requiresLogin, users.list)
    .post(users.create);

  app.route('/users/:user')
    .get(requiresLogin, users.read)
    .put(requiresLogin, isSelf, users.update)
    .delete(requiresLogin, isSelf, users.delete);

  app.route('/session')
    .get(requiresLogin, requiresMe, session.me)
    .post(session.login)
    .delete(requiresLogin, session.logout);

  app.route('*')
    .get(common.notFound);
};
