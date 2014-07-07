'use strict';

module.exports = {
  ip: 'localhost',
  port: process.env.PORT || 9000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  token: {
    secret: 'bookmarkist',
    expiresInMinutes: 60 * 24 * 30
  }
};
