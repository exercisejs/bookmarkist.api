'use strict';

var cors = localrequire.middleware('cors'),
    errorHandler = localrequire.middleware('errorhandler');

module.exports = function(app) {
  app.use(cors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Auth-Token'],
    credentials: true,
    maxAge: 86400
  }));

  app.use(function(req, res, next) {
    res.setToken = function(token) {
      res.setHeader('Auth-Token', token);
      res.token = token;
    };

    res.finish = function(data) {
      data = data || {};
      if (res.token) data.token = res.token;
      res.json(data);
    };

    next();
  });

  localrequire.routes(function(route) {
    route(app);
  });

  app.use(function(req, res, next) {
    next(Errors.ApiNotFound('No resource for url:' + req.path + ' is found.'));
  });

  app.use(errorHandler());
};
