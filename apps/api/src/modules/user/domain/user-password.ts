import Joi from 'joi';
import {ValueObject} from '../../../shared/domain/value-object';
import bcrypt from 'bcrypt';
import {config} from '../../../lib/config';

export interface IUserPasswordProperties {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<IUserPasswordProperties> {
  public static minLength = 6;
  public static maxLength = 16;

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserPasswordProperties) {
    super(properties);
  }

  get value(): string {
    return this.props.value;
  }

  public static isValid(password: string) {
    const {error} = Joi.string()
      .required()
      .min(this.minLength)
      .max(this.maxLength)
      .validate(password);

    return !error;
  }

  public async comparePassword(plainTextPassword: string) {
    if (this.isHashed()) {
      const hashedPassword = this.props.value;
      return this.compareHashed(hashedPassword, plainTextPassword);
    }

    return this.props.value === plainTextPassword;
  }

  private async compareHashed(
    hashedPassword: string,
    plainTextPassword: string,
  ) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, config.env.saltRounds);
  }

  public async getHashedPassword() {
    if (this.isHashed()) {
      return this.props.value;
    }

    return this.hashPassword(this.props.value);
  }

  public isHashed() {
    return this.props.hashed;
  }

  public static create(properties: IUserPasswordProperties) {
    // TODO - update error messages for all ValueObjects
    // Do not validate if the password is hashed
    if (!properties.hashed && !this.isValid(properties.value))
      throw new Error('Invalid password');

    return new UserPassword({
      value: properties.value,
      hashed: properties.hashed,
    });
  }
}
