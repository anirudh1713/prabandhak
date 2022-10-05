import {UserModel} from './user.model';
import {GQLUser} from '../../generated/graphql.generated';
import {User} from './domain/user.entity';
import {UserFirstName} from './domain/user-first-name';
import {UserPassword} from './domain/user-password';
import {UserLastName} from './domain/user-last-name';
import {UserEmail} from './domain/user-email';

export const getUserById = async (
  id: GQLUser['id'],
): Promise<UserModel | undefined> => {
  return UserModel.query().findById(id);
};

export const createUser = async (
  user: Omit<GQLUser, 'id'>,
): Promise<UserModel> => {
  const userData = User.createUser({
    lastName: UserLastName.create(user.lastName),
    firstName: UserFirstName.create(user.firstName),
    email: UserEmail.create(user.email),
    password: UserPassword.create({value: user.password, hashed: false}),
  });

  const hashedPassword = await userData.password.getHashedPassword();

  return UserModel.query().insertAndFetch({
    id: userData.userId.id.toValue(),
    firstName: userData.firstName.value,
    lastName: userData.lastName.value,
    email: userData.email.value,
    password: hashedPassword,
  });
};
