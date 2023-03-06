import * as E from 'fp-ts/Either';
import { User } from '../domain/user.entity';
import { UserModel } from '../user.model';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepositoryPort } from './user.repo.port';
import { InvalidUserInputError } from '../../../lib/errors/custom-errors';
import { UserId } from '../domain/user-id';
import { PromiseEither } from '../../../shared/types/core';
import { UserEmail } from '../domain/user-email';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserAlreadyExistError } from '../errors/user-already-exist.error';

export class UserRepo implements UserRepositoryPort<User> {
  async delete(user: User): PromiseEither<UserNotFoundError, number> {
    try {
      const doesExists = await this.exists(user);
      if (!doesExists) return E.left(new UserNotFoundError());

      const userId = user.userId.id.toString();
      const affectedRows = await UserModel.query().deleteById(userId);
      return E.right(affectedRows);
    } catch {
      // TODO - logging and follow DRY.
      throw new Error('Something went wrong.');
    }
  }

  async exists(user: User): PromiseEither<never, boolean> {
    try {
      const userId = user.userId.id.toString();
      const foundUser = await UserModel.query().findById(userId);

      return E.right(!!foundUser);
    } catch {
      throw new Error('Something went wrong.');
    }
  }

  async save(user: User): PromiseEither<UserAlreadyExistError | InvalidUserInputError, User> {
    try {
      const persistenceUser = await UserMapper.toPersistence(user);
      // @TODO - check if user with same email exists or not.
      const createdUser = await UserModel.query().insertAndFetch(
        persistenceUser,
      );

      // Returning InvalidUserInputError from here does not makes sense.
      // Since we're getting data from DB, we should be able to
      // assume that its correct?
      const domainUser = UserMapper.toDomain(createdUser);
      if (E.isLeft(domainUser)) return domainUser;

      return domainUser;
    } catch {
      throw new Error('Something went wrong.');
    }
  }

  async getUserById(userId: UserId): PromiseEither<UserNotFoundError | InvalidUserInputError, User> {
    try {
      const id = userId.id.toString();
      const user = await UserModel.query().findById(id);

      if (!user) return E.left(new UserNotFoundError());

      const domainUser = UserMapper.toDomain(user);
      if (E.isLeft(domainUser)) return domainUser;

      return domainUser;
    } catch {
      throw new Error('Something went wrong.');
    }
  }

  async isEmailInUse(userEmail: UserEmail): PromiseEither<never, boolean> {
    try {
      const email = userEmail.value;
      const user = await UserModel.query().findOne({ email });

      if (!user) return E.right(false);
      return E.right(true);
    } catch {
      throw new Error('Something went wrong.');
    }
  }
}
