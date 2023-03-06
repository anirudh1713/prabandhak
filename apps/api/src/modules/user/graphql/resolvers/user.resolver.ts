import {UserModule} from '../../generated/module-types';
import * as UserService from '../../user.service';
import {globalObjectIDService} from '../../../../lib/global-object-id/global-object-id.service';
import {UserId} from '../../domain/user-id';
import {isLeft} from 'fp-ts/lib/Either';
import {
  wrappedError,
  InvalidUserInputError,
} from '../../../../lib/errors';
import {UserAlreadyExistError, UserNotFoundError} from '../../errors';

const resolvers: UserModule.Resolvers = {
  Query: {
    me: async (_, arguments_) => {
      const {type, id} = globalObjectIDService.parse(arguments_.id);

      const userId = UserId.createFromExisting(id);
      const userOrError = await UserService.getUserById(userId);
      if (isLeft(userOrError)) {
        return wrappedError(userOrError.left);
      }

      const user = userOrError.right;
      user.id = globalObjectIDService.create(type, id);
      return user;
    },
  },
  Mutation: {
    registerUser: async (_, {registerUserInput}) => {
      const userOrError = await UserService.createUser(registerUserInput);
      if (isLeft(userOrError)) return wrappedError(userOrError.left);

      const user = userOrError.right;
      user.id = globalObjectIDService.create('Viewer', user.id);
      return user;
    },
  },
  UserNotFoundError: {
    __isTypeOf: parent => parent.error instanceof UserNotFoundError,
    message: parent => parent.error.message,
  },
  InvalidUserInputError: {
    __isTypeOf: parent => parent.error instanceof InvalidUserInputError,
    message: parent => parent.error.message,
  },
  UserAlreadyExistsError: {
    __isTypeOf: parent => parent.error instanceof UserAlreadyExistError,
    message: parent => parent.error.message,
  },
  RegisterUserSuccess: {
    __isTypeOf: parent => !!parent.id,
    id: parent => parent.id,
    email: parent => parent.email,
    firstName: parent => parent.firstName,
    lastName: parent => parent.lastName,
    // TODO - fix this.
    createdAt: parent => parent.createdAt || null,
    updatedAt: parent => parent.updatedAt || null,
  },
  Viewer: {
    __isTypeOf: parent => !!parent.id,
    id: parent => parent.id,
    email: parent => parent.email,
    firstName: parent => parent.firstName,
    lastName: parent => parent.lastName,
    // TODO - fix this.
    createdAt: parent => parent.createdAt || null,
    updatedAt: parent => parent.updatedAt || null,
  },
};

export default resolvers;
