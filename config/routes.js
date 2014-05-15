'use strict';

var users = require('../controllers/users'),
    session = require('../controllers/session');

/**
 * Application routes
 */
module.exports = function(app) {
  app.route('/users')
    .get(users.list)
    .post(users.create);

  app.route('/users/:id')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.route('/session')
    .get(session.me)
    .post(session.login)
    .delete(session.logout);

  app.route('*')
    .get(function(req, res) {
      res.send(404);
    });
};
