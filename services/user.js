'use strict';

var Q = require('q'),
    _ = require('lodash'),
    User = localrequire.model('user');

exports.list = function(options) {
  if (!options) options = {};
  if (!options.sort) options.sort = {};
  if (!options.sort.by) options.sort.by = 'created_at';
  if (!options.limit) options.limit = 10;
  if (options.limit < 1) options.limit = 1;
  if (options.limit > 100) options.limit = 100;

  var query = User.find();

  if (options.name) query.where('name').equals(new RegExp(options.name, 'i'));
  if (options.email) query.where('email').equals(new RegExp(options.email, 'i'));

  var sort = options.sort;
  query.where(sort.by);
  if (sort.lt) query.lt(sort.lt);
  if (sort.lte) query.lte(sort.lte);
  if (sort.gt) query.gt(sort.gt);
  if (sort.gte) query.gte(sort.gte);
  query.sort((sort.desc ? '-' : '') + sort.by);
  query.limit(options.limit);

  var deferred = Q.defer();

  query.exec(function(err, users) {
    if (err) return deferred.reject(err);

    deferred.resolve(users);
  });

  return deferred.promise;
};

exports.preload = function(id) {
  var deferred = Q.defer();

  User.findOne({ _id: id }).exec(function(err, user) {
    if (err) {
      if (err.name === 'CastError' && err.type === 'ObjectId')
        return deferred.reject(Errors.UserNotFound('User:' + id + ' is not found.'));
      else
        return deferred.reject(err);
    }

    if (!user) return deferred.reject(Errors.UserNotFound('User:' + id + ' is not found.'));

    deferred.resolve(user);
  });

  return deferred.promise;
};

exports.read = function(id) {
  var deferred = Q.defer();

  User.findOne({ _id: id }).exec(function(err, user) {
    if (err) {
      if (err.name === 'CastError' && err.type === 'ObjectId')
        return deferred.reject(Errors.UserNotFound('User:' + id + ' is not found.'));
      else
        return deferred.reject(err);
    }

    if (!user) return deferred.reject(Errors.UserNotFound('User:' + id + ' is not found.'));

    deferred.resolve(user);
  });

  return deferred.promise;
};

exports.authenticate = function(email, password) {
  var deferred = Q.defer();

  User.findOne({ email: email.toLowerCase() }).exec(function(err, user) {
    if (err) return deferred.reject(err);

    if (!user) return deferred.reject(Errors.UserMismatch('User:' + email + ' is not found.'));
    if (!user.authenticate(password))
      return deferred.reject(Errors.PasswordMismatch('Password for user:' + email + ' is invalid.'));

    deferred.resolve(user);
  });

  return deferred.promise;
};

exports.create = function(contents) {
  _.forOwn(contents, function(value, key) {
    if (!_.contains(['email', 'password', 'name', 'description'], key)) delete contents[key];
  });

  var deferred = Q.defer();

  new User(contents).save(function(err, user) {
    if (err) {
      if (err.code === 11000)
        return deferred.reject(Errors.UserDuplicated('User:' + contents.email + ' already exists.'));
      else
        return deferred.reject(err);
    }

    deferred.resolve(user);
  });

  return deferred.promise;
};

exports.update = function(user, contents) {
  _.forEach(['name', 'description'], function(field) {
    if (contents[field]) user[field] = contents[field];
  });

  var deferred = Q.defer();

  user.save(function(err, user) {
    if (err) return deferred.reject(err);

    deferred.resolve(user);
  });

  return deferred.promise;
};

exports.delete = function(user) {
  var deferred = Q.defer();

  user.remove(function(err, user) {
    if (err) return deferred.reject(err);

    deferred.resolve(user);
  });

  return deferred.promise;
};
