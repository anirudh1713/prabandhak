import {
  GQLRegisterUserInput,
  GQLRegisterUserPayload,
  GQLViewer,
} from '../../generated/graphql';
import { User } from './domain/user.entity';
import { UserFirstName } from './domain/user-first-name';
import { UserPassword } from './domain/user-password';
import { UserLastName } from './domain/user-last-name';
import { UserEmail } from './domain/user-email';
import { UserMapper } from './mappers/user.mapper';
import { userRepo } from './repositories';
import { UserId } from './domain/user-id';
import { isLeft, right } from 'fp-ts/lib/Either';
import { PromiseEither } from '../../shared/types/core';
import { UserAlreadyExistError, UserNotFoundError } from './domain/user.errors';

// @TODO - strongly type return type as graphQL types
export const getUserById = async (
  id: UserId,
): PromiseEither<UserNotFoundError, GQLViewer> => {
  const userOrError = await userRepo.getUserById(id);
  // in case of error return it.
  if (isLeft(userOrError)) return userOrError;

  const user = userOrError.right;
  return right(UserMapper.toDTO(user));
};

export const createUser = async (
  user: GQLRegisterUserInput,
): PromiseEither<UserAlreadyExistError, GQLRegisterUserPayload> => {
  const userData = User.create({
    lastName: UserLastName.create(user.lastName),
    firstName: UserFirstName.create(user.firstName),
    email: UserEmail.create(user.email),
    password: UserPassword.create({ value: user.password, hashed: false }),
  });

  const createdUserOrError = await userRepo.save(userData);
  if (isLeft(createdUserOrError)) return createdUserOrError;

  const createdUser = createdUserOrError.right;
  return right(UserMapper.toDTO(createdUser));
};
