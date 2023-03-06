import { ErrorBase } from './error.base';
import { INVALID_USER_INPUT_ERROR, NOT_FOUND } from './error.codes';

export class NotFoundError extends ErrorBase {
  static readonly message = 'Not found';
  readonly code = NOT_FOUND;

  constructor(message = NotFoundError.message) {
    super(message);
  }
}

export class InvalidUserInputError extends ErrorBase {
  static readonly message = 'Invalid user input';
  readonly code = INVALID_USER_INPUT_ERROR;

  constructor(message = InvalidUserInputError.message, error?: Error) {
    super(message, error);
  }
}
