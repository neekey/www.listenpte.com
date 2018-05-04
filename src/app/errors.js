import util from 'util';

export function CustomizeError() {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }
  this.name = this.constructor.name;
}
util.inherits(CustomizeError, Error);

export class RequestError extends CustomizeError {
  constructor(status, error) {
    super(status, error);
    this.status = status;
    this.error = error;
    this.message = error.message;
  }
}

export class NetworkError extends CustomizeError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

export class TokenError extends CustomizeError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
