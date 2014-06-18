'use strict';

var errorHandler = localrequire.middleware('errorhandler');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.setToken = function(token) {
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
    next(Error.new({
      code: 'NOT_FOUND',
      message: 'No resource for url:' + req.path + ' is found.'
    }));
  });

  app.use(errorHandler());
};
