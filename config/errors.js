'use strict';

function AuthenticationRequiredError(message) {
  this.name = 'AuthenticationRequiredError';
  this.code = 'AUTHENTICATION_REQUIRED';
  this.message = message || '';
}
AuthenticationRequiredError.prototype = new Error();

function AuthenticationInvalidError(message) {
  this.name = 'AuthenticationInvalidError';
  this.code = 'AUTHENTICATION_INVALID';
  this.message = message || '';
}
AuthenticationInvalidError.prototype = new Error();

function TokenInvalidError(message) {
  this.name = 'TokenInvalidError';
  this.code = 'TOKEN_INVALID';
  this.message = message || '';
}
TokenInvalidError.prototype = new Error();

function TokenExpiredError(message) {
  this.name = 'TokenExpiredError';
  this.code = 'TOKEN_EXPIRED';
  this.message = message || '';
}
TokenExpiredError.prototype = new Error();

function NotSelfError(message) {
  this.name = 'NotSelfError';
  this.code = 'NOT_SELF';
  this.message = message || '';
}
NotSelfError.prototype = new Error();

function UserNotFoundError(message) {
  this.name = 'UserNotFoundError';
  this.code = 'USER_NOT_FOUND';
  this.message = message || '';
}
UserNotFoundError.prototype = new Error();

function ApiNotFoundError(message) {
  this.name = 'ApiNotFoundError';
  this.code = 'API_NOT_FOUND';
  this.message = message || '';
}
ApiNotFoundError.prototype = new Error();

function UserDuplicatedError(message) {
  this.name = 'UserDuplicatedError';
  this.code = 'USER_DUPLICATED';
  this.message = message || '';
}
UserDuplicatedError.prototype = new Error();

function UserMismatchError(message) {
  this.name = 'UserMismatchError';
  this.code = 'USER_MISMATCH';
  this.message = message || '';
}
UserMismatchError.prototype = new Error();

function PasswordMismatchError(message) {
  this.name = 'PasswordMismatchError';
  this.code = 'PASSWORD_MISMATCH';
  this.message = message || '';
}
PasswordMismatchError.prototype = new Error();

function FieldRequiredError(field, message) {
  this.name = 'FieldRequiredError';
  this.code = 'FIELD_REQUIRED';
  this.field = field;
  this.message = message || '';
}
FieldRequiredError.prototype = new Error();

function FieldInvalidError(field, message) {
  this.name = 'FieldInvalidError';
  this.code = 'FIELD_INVALID';
  this.field = field;
  this.message = message || '';
}
FieldInvalidError.prototype = new Error();

function ParamRequiredError(param, message) {
  this.name = 'ParamRequiredError';
  this.code = 'PARAM_REQUIRED';
  this.param = param;
  this.message = message || '';
}
ParamRequiredError.prototype = new Error();

function ParamInvalidError(param, message) {
  this.name = 'ParamInvalidError';
  this.code = 'PARAM_INVALID';
  this.param = param;
  this.message = message || '';
}
ParamInvalidError.prototype = new Error();

GLOBAL.Errors = {
  AuthenticationRequired: function(message) {
    return new AuthenticationRequiredError(message);
  },
  AuthenticationInvalid: function(message) {
    return new AuthenticationInvalidError(message);
  },
  TokenInvalid: function(message) {
    return new TokenInvalidError(message);
  },
  TokenExpired: function(message) {
    return new TokenExpiredError(message);
  },
  NotSelf: function(message) {
    return new NotSelfError(message);
  },
  UserNotFound: function(message) {
    return new UserNotFoundError(message);
  },
  ApiNotFound: function(message) {
    return new ApiNotFoundError(message);
  },
  UserDuplicated: function(message) {
    return new UserDuplicatedError(message);
  },
  UserMismatch: function(message) {
    return new UserMismatchError(message);
  },
  PasswordMismatch: function(message) {
    return new PasswordMismatchError(message);
  },
  FieldRequired: function(field, message) {
    return new FieldRequiredError(field, message);
  },
  FieldInvalid: function(field, message) {
    return new FieldInvalidError(field, message);
  },
  ParamRequired: function(param, message) {
    return new ParamRequiredError(param, message);
  },
  ParamInvalid: function(param, message) {
    return new ParamInvalidError(param, message);
  }
};
