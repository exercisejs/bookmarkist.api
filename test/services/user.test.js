'use strict';

var should = require('should'),
    Q = require('q'),
    testutils = localrequire.testutils(),
    User = localrequire.service('user');

describe('User Service:', function() {
  beforeEach(testutils.clear);

  after(testutils.clear);

  describe('create:', function() {
    it('should be able to create a user', function(done) {
      User.create({
        email: 'test@test.com',
        password: 't2$t',
        name: 'Test User',
        description: 'Test User Description'
      })
      .then(function(user) {
        should.exist(user);
        user.id.should.be.an.instanceOf(String).and.not.be.empty;
        user.created_at.should.be.an.instanceOf(Date);
        user.should.be.containEql({
          email: 'test@test.com',
          name: 'Test User',
          description: 'Test User Description',
          has_photo: false
        });

        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should not be able to create a duplicated user', function(done) {
      Q.all([
        User.create({
          email: 'test@test.com',
          password: 't2$t',
          name: 'Test User',
          description: 'Test User Description'
        }),
        User.create({
          email: 'test@test.com',
          password: 't2$t2',
          name: 'Test User 2',
          description: 'New Test User Description'
        })
      ])
      .fail(function(err) {
        should.exist(err);
        should.exist(err.message);
        err.code.should.be.eql('USER_DUPLICATED');

        done();
      })
      .catch(function(err) {
        done(err);
      });
    });
  });
});
