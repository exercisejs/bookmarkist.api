'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    common = require('./common');

var UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
    lowercase: true
  },
  salt: String,
  hashed_password: String,
  name: String,
  description: String,
  photo: String,
  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },
  last_logged_in: Date,
  email_validated: Boolean
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  toObject: {
    virtuals: true,
    getters: true
  }
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema
  .virtual('has_photo')
  .get(function() {
    return !!this.photo;
  });

UserSchema
  .pre('save', function(next) {
    if (!common.validatePresenceOf(this.email)) {
      return next(Errors.FieldRequired('email', 'Email is required.'));
    }

    if (!common.validateEmail(this.email)) {
      return next(Errors.FieldInvalid('email', 'Email format is not valid.'));
    }

    next();
  })
  .pre('save', function(next) {
    if (!common.validatePresenceOf(this.hashed_password)) {
      return next(Errors.FieldRequired('password', 'Password is required.'));
    }

    if (!common.validatePresenceOf(this._password)) {
      return next();
    }

    if (!common.validatePassword(this._password)) {
      return next(Errors.FieldInvalid('password', 'Password format is not valid.'));
    }

    next();
  })
  .pre('save', function(next) {
    if (!common.validatePresenceOf(this.name)) {
      return next(Errors.FieldRequired('name', 'Name is required.'));
    }

    next();
  });

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
