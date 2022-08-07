import {User} from '../db/models/user.model';

export const getUserById = async (id: number): Promise<User | undefined> => {
  return User.query().findById(id);
};

export const createUser = async (user: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}): Promise<User> => {
  return User.query().insertAndFetch({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
};
