import {IRepository} from '../../../shared/infra/repository';
import {User} from '../domain/user.entity';
import {UserModel} from '../user.model';
import {UserMapper} from '../mappers/user.mapper';

export class UserRepo implements IRepository<User> {
  async delete(user: User): Promise<void> {
    const doesExists = await this.exists(user);
    if (!doesExists) throw new Error('User does not exist');

    const userId = user.userId.id.toString();
    await UserModel.query().deleteById(userId);
  }

  async exists(user: User): Promise<boolean> {
    const userId = user.userId.id.toString();
    const foundUser = await UserModel.query().findById(userId);

    return !!foundUser;
  }

  async save(user: User): Promise<User> {
    const persistenceUser = await UserMapper.toPersistence(user);
    const createdUser = await UserModel.query().insertAndFetch(persistenceUser);

    return UserMapper.toDomain(createdUser);
  }

  async getUserById(id: string): Promise<User> {
    const user = await UserModel.query().findById(id);

    if (!user) throw new Error('User not found');

    return UserMapper.toDomain(user);
  }
}
