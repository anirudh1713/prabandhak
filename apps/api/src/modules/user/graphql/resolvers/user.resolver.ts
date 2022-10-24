import {UserModule} from '../../generated/module-types';
import * as UserService from '../../user.service';
import {NotFoundError} from '../../../../lib/custom-errors/not-found';

const resolvers: UserModule.Resolvers = {
  Query: {
    me: async (_, arguments_) => {
      const user = await UserService.getUserById(arguments_.id);
      if (!user) {
        throw new NotFoundError('user not found', {id: arguments_.id});
      }

      return user;
    },
  },
  Mutation: {
    registerUser: async (_, {registerUserInput}) => {
      return UserService.createUser(registerUserInput);
    },
  },
};

export default resolvers;
