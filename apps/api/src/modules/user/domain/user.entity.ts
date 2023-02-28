import {Entity} from '../../../shared/domain/entity';
import {EntityID} from '../../../shared/domain/entity-id';
import {UserEmail} from './user-email';
import {UserFirstName} from './user-first-name';
import {UserLastName} from './user-last-name';
import {UserPassword} from './user-password';
import {UserId} from './user-id';
import {UserCreatedAt} from './user-created-at';
import {UserUpdatedAt} from './user-updated-at';

interface IUserProperties {
  firstName: UserFirstName;
  lastName: UserLastName;
  email: UserEmail;
  password: UserPassword;
  createdAt?: UserCreatedAt;
  updatedAt?: UserUpdatedAt;
}

export class User extends Entity<IUserProperties> {
  get userId(): UserId {
    return UserId.create(this._id);
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

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserProperties, id?: EntityID) {
    super(properties, id);
  }

  public static create(properties: IUserProperties, id?: EntityID): User {
    // TOOD - validate incoming data.
    return new User(
      {
        ...properties,
        createdAt: properties.createdAt ?? UserCreatedAt.create(),
      },
      id,
    );
  }
}
