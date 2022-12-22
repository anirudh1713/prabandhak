import {UserModule} from '../../generated/module-types';
import * as UserService from '../../user.service';
import {NotFoundError} from '../../../../lib/custom-errors/not-found';
import {UserMapper} from '../../mappers/user.mapper';
import {UserID} from '../../domain/user-id';
import {GQLResolvers} from '../../../../generated/graphql';
import {globalObjectIDService} from '../../../../lib/global-object-id/global-object-id.service';
import {TEntityType} from '../../../../shared/domain/types';

const resolvers: UserModule.Resolvers & {Node: GQLResolvers['Node']} = {
  Query: {
    me: async (_, arguments_) => {
      const userEntityID = UserID.create(arguments_.id);

      const user = await UserService.getUserById(userEntityID);
      if (!user) {
        throw new NotFoundError('user not found', {id: arguments_.id});
      }

      return UserMapper.toDTO(user);
    },
    node: async (_, arguments_) => {
      const [type] = <[TEntityType, string]>(
        globalObjectIDService.parse(arguments_.id)
      );

      if (type !== 'Viewer') {
        throw new Error(`type ${type} is invalid`);
      }

      const userEntityID = UserID.create(arguments_.id);
      const user = await UserService.getUserById(userEntityID);

      return UserMapper.toDTO(user);
    },
  },
  Mutation: {
    registerUser: async (_, {registerUserInput}) => {
      const user = await UserService.createUser(registerUserInput, 'Viewer');

      return UserMapper.toDTO(user);
    },
  },
  Node: {
    __resolveType: ({id}) => {
      const [type] = globalObjectIDService.parse(id);
      return type as TEntityType;
    },
  },
};

export default resolvers;
