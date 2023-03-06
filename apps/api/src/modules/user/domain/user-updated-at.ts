import {ValidationError} from 'apollo-server-errors';
import {Either, isLeft, right} from 'fp-ts/lib/Either';
import {
  ITimestampProperties,
  Timestamp,
} from '../../../shared/domain/value-objects/timestamp';

export interface IUserUpdatedAtProperties extends ITimestampProperties {
  value: undefined | string;
}

export class UserUpdatedAt extends Timestamp<IUserUpdatedAtProperties> {
  // TODO - should this be Date | null instead?
  get value(): Date | null {
    if (!this.props.value) return null;
    return new Date(this.props.value);
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserUpdatedAtProperties) {
    super(properties);
  }

  public static create(): UserUpdatedAt;
  public static create(timestamp: Date): Either<ValidationError, UserUpdatedAt>;
  public static create(
    timestamp?: Date,
  ) {
    if (timestamp) {
      const validOrError = this.isValid(timestamp);
      if (isLeft(validOrError)) return validOrError;

      return right(
        new UserUpdatedAt({
          value: this.format(timestamp),
        }),
      );
    }

    return new UserUpdatedAt({ value: this.format(new Date()) });
  }
}
