import bcrypt from 'bcrypt';
import {User} from './user.model';
import {config} from '../../lib/config';
import {GQLUser} from '../../generated/graphql.generated';

export const getUserById = async (
  id: GQLUser['id'],
): Promise<User | undefined> => {
  return User.query().findById(id);
};

export const createUser = async (user: Omit<GQLUser, 'id'>): Promise<User> => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    config.env.saltRounds,
  );

  return User.query().insertAndFetch({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword,
  });
};
