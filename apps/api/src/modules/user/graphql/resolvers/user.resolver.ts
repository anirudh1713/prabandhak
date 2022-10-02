import {GQLResolvers} from '../../../../generated/graphql.generated';
import * as UserService from '../../user.service';
import {NotFoundError} from '../../../../lib/custom-errors/not-found';

const resolvers: GQLResolvers = {
  Query: {
    user: async (parent, arguments_) => {
      const user = await UserService.getUserById(arguments_.id);
      if (!user) {
        throw new NotFoundError('user not found', {id: arguments_.id});
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (parent, arguments_) => {
      return UserService.createUser({
        email: arguments_.email,
        firstName: arguments_.firstName,
        lastName: arguments_.lasName,
        password: arguments_.password,
      });
    },
  },
};

export default resolvers;
