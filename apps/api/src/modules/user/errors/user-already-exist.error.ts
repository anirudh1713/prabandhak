import { ErrorBase } from '../../../lib/errors/error.base';
import { USER_ALREADY_EXIST } from '../../../lib/errors/error.codes';

export class UserAlreadyExistError extends ErrorBase {
  static readonly message = 'User already exists';
  readonly code = USER_ALREADY_EXIST;

  constructor(message = UserAlreadyExistError.message, metadata?: unknown) {
    super(message, undefined, metadata);
  }
}
