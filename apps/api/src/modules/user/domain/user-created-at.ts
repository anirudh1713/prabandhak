import {ValidationError} from 'apollo-server-errors';
import {Either, isLeft, right} from 'fp-ts/lib/Either';
import {
  ITimestampProperties,
  Timestamp,
} from '../../../shared/domain/value-objects/timestamp';

export interface IUserCreatedAtProperties extends ITimestampProperties {
  value: string | undefined;
}

export class UserCreatedAt extends Timestamp<IUserCreatedAtProperties> {
  get value(): Date | null {
    if (!this.props.value) return null;
    return new Date(this.props.value);
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserCreatedAtProperties) {
    super(properties);
  }

  public static create(): UserCreatedAt;
  public static create(timestamp: Date): Either<ValidationError, UserCreatedAt>;
  public static create(
    timestamp?: Date,
  ) {
    if (timestamp) {
      const validOrError = this.isValid(timestamp);
      if (isLeft(validOrError)) return validOrError;

      return right(
        new UserCreatedAt({
          value: this.format(timestamp),
        }),
      );
    }

    return new UserCreatedAt({ value: this.format(new Date()) });
  }
}
