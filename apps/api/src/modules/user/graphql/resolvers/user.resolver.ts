import {GQLResolvers} from '../../../../generated/graphql.generated';
import * as UserService from '../../user.service';
import {NotFoundError} from '../../../../lib/custom-errors/not-found';

const resolvers: GQLResolvers = {
  Query: {
    me: async (parent, arguments_) => {
      const user = await UserService.getUserById(arguments_.id);
      if (!user) {
        throw new NotFoundError('user not found', {id: arguments_.id});
      }

      return user;
    },
  },
  Mutation: {
    registerUser: async (parent, {registerUserInput}) => {
      return UserService.createUser(registerUserInput);
    },
  },
};

export default resolvers;
