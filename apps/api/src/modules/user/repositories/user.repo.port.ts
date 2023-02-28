import { InvalidUserInputError } from '../../../lib/errors';
import { PromiseEither } from '../../../shared/types/core';
import { UserId } from '../domain/user-id';
import { User } from '../domain/user.entity';
import { UserAlreadyExistError, UserNotFoundError } from '../errors';

export interface UserRepositoryPort<T = User> {
  exists(t: T): PromiseEither<never, boolean>;
  delete(t: T): PromiseEither<UserNotFoundError, number>;
  save(t: T): PromiseEither<UserAlreadyExistError | InvalidUserInputError, T>;
  getUserById(id: UserId): PromiseEither<UserNotFoundError | InvalidUserInputError, T>;
}
