import {UserModel} from '../user.model';
import {User} from '../domain/user.entity';
import {UserFirstName} from '../domain/user-first-name';
import {UserLastName} from '../domain/user-last-name';
import {UserPassword} from '../domain/user-password';
import {UserEmail} from '../domain/user-email';
import {EntityID} from '../../../shared/domain/entity-id';
import {IUserDTO} from '../dtos/user.dto';
import {PartialModelObject} from 'objection';

export class UserMapper {
  public static toDomain(user: UserModel): User {
    return User.create(
      {
        firstName: UserFirstName.create(user.firstName),
        lastName: UserLastName.create(user.lastName),
        email: UserEmail.create(user.email),
        password: UserPassword.create({value: user.password, hashed: true}),
      },
      new EntityID(user.id),
    );
  }

  public static toDTO(user: User): IUserDTO {
    return {
      id: user.userId.id.toString(),
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value,
      password: user.password.value,
      createdAt: user?.createdAt?.value || null,
      updatedAt: user?.updatedAt?.value || null,
    };
  }

  public static async toPersistence(
    user: User,
  ): Promise<PartialModelObject<UserModel>> {
    const password = user.password.isHashed()
      ? user.password.value
      : await user.password.getHashedPassword();

    return {
      id: user.userId.id.toString(),
      email: user.email.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      password,
    };
  }
}
