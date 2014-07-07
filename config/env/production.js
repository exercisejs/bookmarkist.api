'use strict';

module.exports = {
  env: 'production',
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 8080,
  mongo: {
    uri: process.env.MONGODB_URL || 'mongodb://localhost/bookmarkist'
  },
  redis: {
    ip: process.env.REDIS_IP || 'localhost',
    port: process.env.REDIS_PORT || 6379
  },
  token: {
    secret: 'bookmarkist',
    expiresInMinutes: 60 * 24 * 365
  }
};
