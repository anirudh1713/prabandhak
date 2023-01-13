import { UserModule } from '../../generated/module-types';
import * as UserService from '../../user.service';
import { globalObjectIDService } from '../../../../lib/global-object-id/global-object-id.service';
import { UserId } from '../../domain/user-id';
import { isLeft } from 'fp-ts/lib/Either';

const resolvers: UserModule.Resolvers = {
  Query: {
    me: async (_, arguments_) => {
      const { type, id } = globalObjectIDService.parse(arguments_.id);

      const userId = UserId.createFromExisting(id);
      const userOrError = await UserService.getUserById(userId);
      if (isLeft(userOrError)) {
        throw userOrError.left;
      }

      const user = userOrError.right;
      user.id = globalObjectIDService.create(type, id);
      return user;
    },
  },
  Mutation: {
    registerUser: async (_, { registerUserInput }) => {
      const userOrError = await UserService.createUser(registerUserInput);
      if (isLeft(userOrError)) throw userOrError.left;

      const user = userOrError.right;
      user.id = globalObjectIDService.create('Viewer', user.id);
      return user;
    },
  },
};

export default resolvers;
