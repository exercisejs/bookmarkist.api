'use strict';

var users = require('../controllers/users'),
    session = require('../controllers/session'),
    preloading = require('./middlewares/preloading.js'),
    authorization = require('./middlewares/authorization.js');

var requiresMe = preloading.requiresMe;
var requiresLogin = authorization.requiresLogin;
var isSelf = authorization.isSelf;

/**
 * Application routes
 */
module.exports = function(app) {
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
    .get(function(req, res) {
      res.send(404);
    });
};
