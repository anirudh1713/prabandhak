import {Entity} from '../../../shared/domain/entity';
import {UserEmail} from './user-email';
import {UserFirstName} from './user-first-name';
import {UserLastName} from './user-last-name';
import {UserPassword} from './user-password';
import {UserID} from './user-id';
import {UserCreatedAt} from './user-created-at';
import {UserUpdatedAt} from './user-updated-at';
import {TEntityType} from '../../../shared/domain/types';

interface IUserProperties {
  firstName: UserFirstName;
  lastName: UserLastName;
  email: UserEmail;
  password: UserPassword;
  createdAt?: UserCreatedAt;
  updatedAt?: UserUpdatedAt;
}

export class User extends Entity<IUserProperties> {
  get userID(): UserID {
    return UserID.createFromEntityID(this._id);
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static createFromExisting(
    properties: IUserProperties,
    id: UserID,
  ): User {
    // TODO - validation

    return new User({
      properties: {
        ...properties,
        createdAt: properties.createdAt ?? UserCreatedAt.create(new Date()),
      },
      id: id.value,
    });
  }

  public static createNew(properties: IUserProperties, userType: TEntityType) {
    return new User({
      properties: {
        ...properties,
        createdAt: UserCreatedAt.create(new Date()),
      },
      type: userType,
    });
  }
}
