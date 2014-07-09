'use strict';

var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    methodOverride = require('method-override'),
    config = localrequire.config();

var app = express();

var env = app.get('env');

if ('production' === env) {
  // Enables redirection to https for production mode on AWS.
  // This middleware should be at the first place.
  app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  });
}

if ('development' === env) {
  app.use(require('connect-livereload')());
}

if ('production' === env) {
  app.use(compression());
}

app.use(morgan('dev'));
app.use(bodyParser());
app.use(multer({ dest: './.tmp/'}));
app.use(methodOverride());

require('./routes')(app);

var server = require('./io')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

module.exports = app;
