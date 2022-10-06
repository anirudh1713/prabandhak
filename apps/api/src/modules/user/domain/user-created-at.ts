import {
  ITimestampProperties,
  Timestamp,
} from '../../../shared/domain/value-objects/timestamp';

export interface IUserCreatedAtProperties extends ITimestampProperties {
  value: undefined | string;
}

export class UserCreatedAt extends Timestamp<IUserCreatedAtProperties> {
  get value(): undefined | string {
    return this.props.value;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserCreatedAtProperties) {
    super(properties);
  }

  public static create(timestamp?: Date) {
    if (timestamp && !this.isValid(timestamp))
      throw new Error('Invalid created at timestamp');

    return new UserCreatedAt({
      value: timestamp ? this.format(timestamp) : undefined,
    });
  }
}
