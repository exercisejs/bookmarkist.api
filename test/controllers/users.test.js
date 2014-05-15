'use strict';

require('should');

var app = require('../../server'),
    request = require('supertest');

describe('GET /users', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
