import {UserModule} from '../../generated/module-types';
import * as UserService from '../../user.service';
import {NotFoundError} from '../../../../lib/custom-errors/not-found';
import {UserMapper} from '../../mappers/user.mapper';
import {UserID} from '../../domain/user-id';

const resolvers: UserModule.Resolvers = {
  Query: {
    me: async (_, arguments_) => {
      const userEntityID = UserID.create(arguments_.id);

      const user = await UserService.getUserById(userEntityID);
      if (!user) {
        throw new NotFoundError('user not found', {id: arguments_.id});
      }

      return UserMapper.toDTO(user);
    },
  },
  Mutation: {
    registerUser: async (_, {registerUserInput}) => {
      const user = await UserService.createUser(registerUserInput, 'Viewer');

      return UserMapper.toDTO(user);
    },
  },
};

export default resolvers;
