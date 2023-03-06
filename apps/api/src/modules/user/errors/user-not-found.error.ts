import { ErrorBase } from '../../../lib/errors/error.base';
import { USER_NOT_FOUND } from '../../../lib/errors/error.codes';

export class UserNotFoundError extends ErrorBase {
  static readonly message = 'User not found';
  readonly code = USER_NOT_FOUND;

  constructor(message = UserNotFoundError.message) {
    super(message);
  }
}
