import { PromiseEither } from '../../../shared/types/core';
import { UserId } from '../domain/user-id';
import { User } from '../domain/user.entity';
import { UserAlreadyExistError, UserNotFoundError } from '../domain/user.errors';

export interface UserRepositoryPort<T = User> {
  exists(t: T): PromiseEither<never, boolean>;
  delete(t: T): PromiseEither<UserNotFoundError, number>;
  save(t: T): PromiseEither<UserAlreadyExistError, T>;
  getUserById(id: UserId): PromiseEither<UserNotFoundError, T>;
}
