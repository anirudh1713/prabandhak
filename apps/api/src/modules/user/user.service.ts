import * as E from 'fp-ts/Either';
import {sequenceS} from 'fp-ts/Apply';
import {
  GQLRegisterUserInput,
  GQLRegisterUserSuccess,
  GQLViewer,
} from '../../generated/graphql';
import {User} from './domain/user.entity';
import {UserFirstName} from './domain/user-first-name';
import {UserPassword} from './domain/user-password';
import {UserLastName} from './domain/user-last-name';
import {UserEmail} from './domain/user-email';
import {UserMapper} from './mappers/user.mapper';
import {userRepo} from './repositories';
import {UserId} from './domain/user-id';
import {PromiseEither} from '../../shared/types/core';
import { UserAlreadyExistError, UserNotFoundError } from './errors'
import { InvalidUserInputError } from '../../lib/errors';

export const getUserById = async (
  id: UserId,
): PromiseEither<UserNotFoundError | InvalidUserInputError, GQLViewer> => {
  const userOrError = await userRepo.getUserById(id);
  // in case of error return it.
  if (E.isLeft(userOrError)) return userOrError;

  const user = userOrError.right;
  return E.right(UserMapper.toDTO(user));
};

export const createUser = async (
  user: GQLRegisterUserInput,
): PromiseEither<
  UserAlreadyExistError | InvalidUserInputError,
  GQLRegisterUserSuccess
> => {
  const sequenceSEither = sequenceS(E.Apply);

  const result = sequenceSEither({
    lastNameOrError: UserLastName.create(user.lastName),
    firstNameOrError: UserFirstName.create(user.firstName),
    emailOrError: UserEmail.create(user.email),
    passwordOrError: UserPassword.create({
      value: user.password,
      hashed: false,
    }),
  });

  if (E.isLeft(result)) return result;

  const userData = User.create({
    lastName: result.right.lastNameOrError,
    firstName: result.right.firstNameOrError,
    email: result.right.emailOrError,
    password: result.right.passwordOrError,
  });

  // TODO - make this reurn boolean instead of either
  const emailInUse = await userRepo.isEmailInUse(userData.email);
  if (E.isRight(emailInUse) && emailInUse.right) {
    return E.left(
      new UserAlreadyExistError('User with this email already exists', {
        email: userData.email.value,
      }),
    );
  }

  const createdUserOrError = await userRepo.save(userData);
  if (E.isLeft(createdUserOrError)) return createdUserOrError;

  const createdUser = createdUserOrError.right;
  return E.right(UserMapper.toDTO(createdUser));
};
