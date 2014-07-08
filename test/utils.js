'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

var testutils = {
  clear: function(done) {
    User.remove().exec(function() {
      done();
    });
  }
};

localrequire.testutils = function () {
  return testutils;
};
