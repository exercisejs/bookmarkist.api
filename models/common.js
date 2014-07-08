'use strict';

exports.validatePresenceOf = function(value) {
  return value && value.length;
};

exports.validateEmail = function(email) {
  return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i).test(email);
};

exports.validatePassword = function(password) {
  // should contain at least one number
  // should contain at least one special character
  // should have length of at least 4 and at most 16
  return (/^(?=.*[0-9])(?=.*[\W_])\S{4,16}$/).test(password);
};
