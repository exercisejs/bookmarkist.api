'use strict';

module.exports = {
  env: 'development',
  mongo: {
    uri: 'mongodb://localhost/bookmarkist-dev'
  },
  redis: {
    ip: 'localhost',
    port: 6379
  }
};
