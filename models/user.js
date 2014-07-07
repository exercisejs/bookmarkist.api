'use strict';

var Q = require('q'),
  Backbone = require('backbone'),
  _ = require('lodash'),
  Chance = require('chance');

var chance = new Chance();

var User = Backbone.Model.extend({
  toJSON: function() {
    return this.omit('password');
  }
});

var Users = Backbone.Collection.extend({
  model: User
});

var users = new Users();

exports.list = function(options) {
  return Q.fcall(function() {
    var offset = options.offset;
    var limit = options.limit ? parseInt(options.limit) : undefined;

    var start = offset ? users.indexOf(users.get(offset)) + 1 : 0;
    var end = limit ? start + limit : users.length;

    return _.invoke(users.slice(start, end), 'toJSON');
  });
};

exports.read = function(id) {
  return Q.fcall(function() {
    var user = users.get(id);
    if (user) {
      return user.toJSON();
    } else {
      throw Errors.UserNotFound('User:' + id + ' is not found.');
    }
  });
};

exports.authenticate = function(email, password) {
  return Q.fcall(function() {
    var user = users.findWhere({ email: email });
    if (user) {
      if (user.get('password') === password) {
        return user.toJSON();
      } else {
        throw Errors.PasswordMismatch('Password for user:' + email + ' is invalid.');
      }
    } else {
      throw Errors.UserMismatch('User:' + email + ' is not found.');
    }
  });
};

exports.create = function(user) {
  return Q.fcall(function() {
    var email = user.email;
    var existing = users.findWhere({ email: email });
    if (existing) {
      throw Errors.UserDuplicated('User:' + email + ' already exists.');
    } else {
      var id = chance.hash({ length: 24 });
      user.id = id;
      users.add(user);
      return users.get(id).toJSON();
    }
  });
};

exports.update = function(user) {
  return Q.fcall(function() {
    var id = user.id;
    var existing = users.get(id);
    if (existing) {
      existing.set(user);
      return existing.toJSON();
    } else {
      throw Errors.UserNotFound('User:' + id + ' is not found.');
    }
  });
};

exports.delete = function(id) {
  return Q.fcall(function() {
    var existing = users.get(id);
    if (existing) {
      users.remove(id);
      return existing.toJSON();
    } else {
      throw Errors.UserNotFound('User:' + id + ' is not found.');
    }
  });
};
