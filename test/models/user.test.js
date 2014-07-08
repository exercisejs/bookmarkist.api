'use strict';

var should = require('should'),
    testutils = localrequire.testutils(),
    User = localrequire.model('user');

var user;

describe('User Model', function() {
  before(function(done) {
    user = new User({
      name: 'User',
      email: 'user@test.com',
      password: 'u$2r'
    });

    testutils.clear(done);
  });

  afterEach(testutils.clear);

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save();
    var userDup = new User(user);
    userDup.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should authenticate user if password is valid', function() {
    user.authenticate('u$2r').should.be.true;
  });

  it('should not authenticate user if password is invalid', function() {
    user.authenticate('user').should.not.be.true;
  });

});
