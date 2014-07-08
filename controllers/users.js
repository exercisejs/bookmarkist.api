'use strict';

var jwt = require('jsonwebtoken'),
    User = localrequire.service('user'),
    config = localrequire.config();

var getSort = function(sort) {
  switch (sort) {
    case 'EMAIL':
    case undefined:
      return {
        by: 'email',
        desc: false
      };
    case '-EMAIL':
      return {
        by: 'email',
        desc: true
      };
    case 'CREATED':
      return {
        by: 'created_at',
        desc: false
      };
    case '-CREATED':
      return {
        by: 'created_at',
        desc: true
      };
    default:
      throw Errors.ParamInvalid('sort',
        'Parameter sort is not invalid. Should be one of EMAIL, -EMAIL, CREATED or -CREATED.');
  }
};

exports.list = function(req, res, next) {
  var sort = getSort(req.query.sort);

  User.list({
    name: req.query.name,
    email: req.query.email,
    sort: {
      by: sort.by,
      desc: sort.desc,
      lt: req.query.lt ? new Date(req.query.lt): undefined,
      lte: req.query.lte ? new Date(req.query.lte): undefined,
      gt: req.query.gt ? new Date(req.query.gt): undefined,
      gte: req.query.gte ? new Date(req.query.gte): undefined
    },
    limit: req.query.limit
  })
  .then(function(users) {
    res.finish({
      users: users
    });
  })
  .catch(function(err) {
    next(err);
  });
};

exports.read = function(req, res, next) {
  User.read(req.params.user)
  .then(function(user) {
    res.finish({
      user: user
    });
  })
  .catch(function(err) {
    next(err);
  });
};

exports.create = function(req, res, next) {
  User.create(req.body)
  .then(function(user) {
    var token = jwt.sign({
      id: user.id,
      email: user.email
    }, config.token.secret, {
      expiresInMinutes: config.token.expiresInMinutes
    });

    res.setToken(token);

    res.finish({
      user: user
    });
  })
  .catch(function(err) {
    next(err);
  });
};

exports.update = function(req, res, next) {
  User.update(req.user, req.body)
  .then(function(user) {
    res.finish({
      user: user
    });
  })
  .catch(function(err) {
    next(err);
  });
};

exports.delete = function(req, res, next) {
  User.delete(req.user)
  .then(function(user) {
    res.finish({
      user: user
    });
  })
  .catch(function(err) {
    next(err);
  });
};
