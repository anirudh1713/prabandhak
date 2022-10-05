import Joi from 'joi';
import {ValueObject} from '../../../shared/domain/value-object';

export interface IUserFirstNameProperties {
  value: string;
}

export class UserFirstName extends ValueObject<IUserFirstNameProperties> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserFirstNameProperties) {
    super(properties);
  }

  get value() {
    return this.props.value;
  }

  private static isValid(firstName: string) {
    const {error} = Joi.string().required().min(2).max(10).validate(firstName);

    return !error;
  }

  private static format(firstName: string) {
    return firstName.trim();
  }

  public static create(firstName: string) {
    if (!this.isValid(firstName)) throw new Error('Invalid first name');

    return new UserFirstName({value: this.format(firstName)});
  }
}
