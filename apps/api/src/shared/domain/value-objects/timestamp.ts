import Joi from 'joi';
import {ValueObject} from '../value-object';

export interface ITimestampProperties {
  value: string | undefined;
}

export class Timestamp<T extends ITimestampProperties> extends ValueObject<T> {
  // eslint-disable-next-line no-useless-constructor
  public constructor(properties: T) {
    super(properties);
  }

  protected static isValid(timestamp: Date) {
    const {error} = Joi.string()
      .required()
      .isoDate()
      .validate(timestamp.toISOString());

    return !error;
  }

  protected static format(timestamp: Date) {
    return timestamp.toISOString();
  }
}
