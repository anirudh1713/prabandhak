import { UserModule } from '../../generated/module-types';
import * as UserService from '../../user.service';
import { NotFoundError } from '../../../../lib/custom-errors/not-found';
import { globalObjectIDService } from '../../../../lib/global-object-id/global-object-id.service';

const resolvers: UserModule.Resolvers = {
  Query: {
    me: async (_, arguments_) => {
      const { type, id } = globalObjectIDService.parse(arguments_.id);

      const user = await UserService.getUserById(id);
      if (!user) {
        throw new NotFoundError('user not found', { id: arguments_.id });
      }

      user.id = globalObjectIDService.create(type, id);
      return user;
    },
  },
  Mutation: {
    registerUser: async (_, { registerUserInput }) => {
      const user = await UserService.createUser(registerUserInput);

      user.id = globalObjectIDService.create('Viewer', user.id);
      return user;
    },
  },
};

export default resolvers;
