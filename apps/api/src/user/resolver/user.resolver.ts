import {GQLResolvers} from '../../generated/graphql.generated';
import {createUser, getUserById} from '../user.service';

const resolvers: GQLResolvers = {
  Query: {
    user: async (parent, arguments_) => {
      const user = await getUserById(arguments_.id);
      if (!user) {
        throw new Error('user not found');
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (parent, arguments_) => {
      const user = await createUser({
        email: arguments_.email,
        firstName: arguments_.firstName,
        lastName: arguments_.lasName,
        password: arguments_.password,
      });

      return user;
    },
  },
};

export default resolvers;
