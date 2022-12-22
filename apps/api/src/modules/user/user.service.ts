import {GQLRegisterUserInput} from '../../generated/graphql';
import {User} from './domain/user.entity';
import {UserFirstName} from './domain/user-first-name';
import {UserPassword} from './domain/user-password';
import {UserLastName} from './domain/user-last-name';
import {UserEmail} from './domain/user-email';
import {UserMapper} from './mappers/user.mapper';
import {userRepo} from './repositories';
import {TEntityType} from '../../shared/domain/types';
import {UserID} from './domain/user-id';

// TODO - should be EntityID
export const getUserById = async (id: UserID): Promise<User> => {
  const user = await userRepo.getUserById(id.value.toValue().rawID);
  return UserMapper.toDomain(user, id);
};

export const createUser = async (
  user: GQLRegisterUserInput,
  userType: TEntityType,
): Promise<User> => {
  const userData = User.createNew(
    {
      lastName: UserLastName.create(user.lastName),
      firstName: UserFirstName.create(user.firstName),
      email: UserEmail.create(user.email),
      password: UserPassword.create({value: user.password, hashed: false}),
    },
    userType,
  );

  const createdUser = await userRepo.save(userData);

  return UserMapper.toDomain(createdUser, userData.userID);
};
