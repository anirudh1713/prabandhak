import { ValueObject } from '../../../shared/domain/value-object';
import bcrypt from 'bcrypt';
import { config } from '../../../lib/config';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { z } from 'zod';
import { InvalidUserInputError } from '../../../lib/errors';

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

  public static isValid(password: string): Either<InvalidUserInputError, true> {
    const schema = z
      .string()
      .min(this.minLength, {
        message: `Must be ${this.minLength} or more characters long`,
      })
      .max(this.maxLength, {
        message: `Must be ${this.maxLength} or fewer characters long`,
      });

    const parsed = schema.safeParse(password);

    if (!parsed.success) {
      return left(new InvalidUserInputError(parsed.error.message));
    }

    return right(parsed.success);
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

  public static create(
    properties: IUserPasswordProperties,
  ): Either<InvalidUserInputError, UserPassword> {
    // Do not validate if the password is hashed
    const validOrError = this.isValid(properties.value);
    if (!properties.hashed && isLeft(validOrError)) return validOrError;

    return right(
      new UserPassword({
        value: properties.value,
        hashed: properties.hashed,
      }),
    );
  }
}
