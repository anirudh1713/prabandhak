import {
  ITimestampProperties,
  Timestamp,
} from '../../../shared/domain/value-objects/timestamp';

export interface IUserUpdatedAtProperties extends ITimestampProperties {
  value: undefined | string;
}

export class UserUpdatedAt extends Timestamp<IUserUpdatedAtProperties> {
  get value(): undefined | string {
    return this.props.value;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserUpdatedAtProperties) {
    super(properties);
  }

  public static create(timestamp?: Date) {
    if (timestamp && !this.isValid(timestamp))
      throw new Error('Invalid updated at timestamp');

    return new UserUpdatedAt({
      value: timestamp ? this.format(timestamp) : undefined,
    });
  }
}
