import {ValueObject} from '../../../shared/domain/value-object';
import Joi from 'joi';

export interface IUserEmailProperties {
  value: string;
}

export class UserEmail extends ValueObject<IUserEmailProperties> {
  get value(): string {
    return this.props.value;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserEmailProperties) {
    super(properties);
  }

  private static isValid(email: string) {
    const {error} = Joi.string().email().validate(email);

    return !error;
  }

  private static format(email: string) {
    return email.trim().toLowerCase();
  }

  public static create(email: string) {
    if (!this.isValid(email)) throw new Error('Invalid email');

    return new UserEmail({value: this.format(email)});
  }
}
