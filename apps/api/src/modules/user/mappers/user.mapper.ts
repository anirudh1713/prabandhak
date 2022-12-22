import {UserModel} from '../user.model';
import {User} from '../domain/user.entity';
import {UserFirstName} from '../domain/user-first-name';
import {UserLastName} from '../domain/user-last-name';
import {UserPassword} from '../domain/user-password';
import {UserEmail} from '../domain/user-email';
import {IUserDTO} from '../dtos/user.dto';
import {PartialModelObject} from 'objection';
import {UserID} from '../domain/user-id';

export class UserMapper {
  public static toDomain(user: UserModel, id: UserID): User {
    return User.createFromExisting(
      {
        firstName: UserFirstName.create(user.firstName),
        lastName: UserLastName.create(user.lastName),
        email: UserEmail.create(user.email),
        password: UserPassword.create({value: user.password, hashed: true}),
      },
      id,
    );
  }

  public static toDTO(user: User): IUserDTO {
    return {
      id: user.userID.value.toValue().value,
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
      id: user.userID.value.toValue().rawID,
      email: user.email.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      password,
    };
  }
}
