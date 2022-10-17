import {
  GQLRegisterUserInput,
  GQLRegisterUserPayload,
  GQLViewer,
} from '../../generated/graphql.generated';
import {User} from './domain/user.entity';
import {UserFirstName} from './domain/user-first-name';
import {UserPassword} from './domain/user-password';
import {UserLastName} from './domain/user-last-name';
import {UserEmail} from './domain/user-email';
import {UserMapper} from './mappers/user.mapper';
import {userRepo} from './repositories';

export const getUserById = async (id: GQLViewer['id']): Promise<GQLViewer> => {
  const user = await userRepo.getUserById(id);
  return UserMapper.toDTO(user);
};

export const createUser = async (
  user: GQLRegisterUserInput,
): Promise<GQLRegisterUserPayload> => {
  const userData = User.create({
    lastName: UserLastName.create(user.lastName),
    firstName: UserFirstName.create(user.firstName),
    email: UserEmail.create(user.email),
    password: UserPassword.create({value: user.password, hashed: false}),
  });

  const createdUser = await userRepo.save(userData);

  return UserMapper.toDTO(createdUser);
};
