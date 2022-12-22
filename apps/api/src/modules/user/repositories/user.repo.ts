import {IRepository} from '../../../shared/infra/repository';
import {User} from '../domain/user.entity';
import {UserModel} from '../user.model';
import {UserMapper} from '../mappers/user.mapper';

export class UserRepo implements IRepository<User> {
  async delete(userID: string): Promise<void> {
    const doesExists = await this.exists(userID);
    if (!doesExists) throw new Error('User does not exist');

    await UserModel.query().deleteById(userID);
  }

  async exists(userID: string): Promise<boolean> {
    const foundUser = await UserModel.query().findById(userID);

    return !!foundUser;
  }

  async save(user: User): Promise<UserModel> {
    const persistenceUser = await UserMapper.toPersistence(user);
    return UserModel.query().insertAndFetch(persistenceUser);
  }

  async getUserById(userID: string): Promise<UserModel> {
    const user = await UserModel.query().findById(userID);

    if (!user) throw new Error('User not found');

    return user;
  }
}
