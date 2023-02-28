import * as E from 'fp-ts/Either';
import { User } from '../domain/user.entity';
import { UserModel } from '../user.model';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepositoryPort } from './user.repo.port';
import { InternalServerError } from '../../../lib/errors/custom-errors';
import { UserAlreadyExistError, UserNotFoundError } from '../domain/user.errors';
import { UserId } from '../domain/user-id';
import { PromiseEither } from '../../../shared/types/core';
import { UserInputError } from 'apollo-server-errors';

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

  async save(user: User): PromiseEither<UserAlreadyExistError | UserInputError, User> {
    try {
      const persistenceUser = await UserMapper.toPersistence(user);
      // @TODO - check if user with same email exists or not.
      const createdUser = await UserModel.query().insertAndFetch(
        persistenceUser,
      );

      // Returning UserInputError from here does not makes sense.
      // Since we're getting data from DB, we should be able to
      // assume that its correct?
      const domainUser = UserMapper.toDomain(createdUser);
      if (E.isLeft(domainUser)) return domainUser;

      return domainUser;
    } catch (error) {
      console.log(error);
      return E.left(
        new InternalServerError(
          undefined,
          error instanceof Error ? error : undefined,
        ),
      );
    }
  }

  async getUserById(userId: UserId): PromiseEither<UserNotFoundError | UserInputError, User> {
    try {
      const id = userId.id.toString();
      const user = await UserModel.query().findById(id);

      if (!user) return E.left(new UserNotFoundError());

      const domainUser = UserMapper.toDomain(user);
      if (E.isLeft(domainUser)) return domainUser;

      return domainUser;
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
