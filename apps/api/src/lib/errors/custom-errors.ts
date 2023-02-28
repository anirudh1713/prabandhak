import { ErrorBase } from './error.base';
import { INTERNAL_SERVER_ERROR, INVALID_USER_INPUT_ERROR, NOT_FOUND } from './error.codes';

export class NotFoundError extends ErrorBase {
  static readonly message = 'Not found';
  readonly code = NOT_FOUND;

  constructor(message = NotFoundError.message) {
    super(message);
  }
}

export class InternalServerError extends ErrorBase {
  static readonly message = 'Internal server error';
  readonly code = INTERNAL_SERVER_ERROR;

  constructor(message = InternalServerError.message, error?: Error) {
    super(message, error);
  }
}

export class InvalidUserInputError extends ErrorBase {
  static readonly message = 'Invalid user input';
  readonly code = INVALID_USER_INPUT_ERROR;

  constructor(message = InternalServerError.message, error?: Error) {
    super(message, error);
  }
}
