import * as E from 'fp-ts/Either';
import { User } from '../domain/user.entity';
import { UserModel } from '../user.model';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepositoryPort } from './user.repo.port';
import { InternalServerError } from '../../../lib/errors/custom-errors';
import { UserAlreadyExistError, UserNotFoundError } from '../domain/user.errors';
import { UserId } from '../domain/user-id';
import { PromiseEither } from '../../../shared/types/core';

export class UserRepo implements UserRepositoryPort<User> {
  async delete(user: User): PromiseEither<UserNotFoundError, number> {
    try {
      const doesExists = await this.exists(user);
      if (!doesExists) return E.left(new UserNotFoundError());

      const userId = user.userId.id.toString();
      const affectedRows = await UserModel.query().deleteById(userId);
      return E.right(affectedRows);
    } catch (error) {
      return E.left(
        new InternalServerError(
          undefined,
          error instanceof Error ? error : undefined,
        ),
      );
    }
  }

  async exists(user: User): PromiseEither<never, boolean> {
    try {
      const userId = user.userId.id.toString();
      const foundUser = await UserModel.query().findById(userId);

      return E.right(!!foundUser);
    } catch (error) {
      return E.left(
        new InternalServerError(
          undefined,
          error instanceof Error ? error : undefined,
        ),
      );
    }
  }

  async save(user: User): PromiseEither<UserAlreadyExistError, User> {
    try {
      const persistenceUser = await UserMapper.toPersistence(user);
      // @TODO - check if user with same email exists or not.
      const createdUser = await UserModel.query().insertAndFetch(
        persistenceUser,
      );

      return E.right(UserMapper.toDomain(createdUser));
    } catch (error) {
      return E.left(
        new InternalServerError(
          undefined,
          error instanceof Error ? error : undefined,
        ),
      );
    }
  }

  async getUserById(userId: UserId): PromiseEither<UserNotFoundError, User> {
    try {
      const id = userId.id.toString();
      const user = await UserModel.query().findById(id);

      if (!user) return E.left(new UserNotFoundError());

      return E.right(UserMapper.toDomain(user));
    } catch (error) {
      return E.left(
        new InternalServerError(
          undefined,
          error instanceof Error ? error : undefined,
        ),
      );
    }
  }
}
