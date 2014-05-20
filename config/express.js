'use strict';

var morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('./errorhandler');

/**
 * Express configuration
 */
module.exports = function(app) {
  var env = app.get('env');

  if ('development' === env) {
    app.use(require('connect-livereload')());
  }

  if ('production' === env) {
    app.use(compression());
  }

  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());

  require('./routes')(app);

  // Error handler - has to be last
  app.use(errorHandler());
};
