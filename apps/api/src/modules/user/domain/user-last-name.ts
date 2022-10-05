import Joi from 'joi';
import {ValueObject} from '../../../shared/domain/value-object';

export interface IUserLastNameProperties {
  value: string;
}

export class UserLastName extends ValueObject<IUserLastNameProperties> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserLastNameProperties) {
    super(properties);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValid(lastName: string) {
    const {error} = Joi.string().required().min(2).max(10).validate(lastName);

    return !error;
  }

  private static format(lastName: string) {
    return lastName.trim();
  }

  public static create(lastName: string) {
    if (!this.isValid(lastName)) throw new Error('Invalid last name');

    return new UserLastName({value: this.format(lastName)});
  }
}
