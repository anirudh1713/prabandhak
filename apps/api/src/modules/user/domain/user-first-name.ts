import { UserInputError } from 'apollo-server-errors';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { z } from 'zod';
import { ValueObject } from '../../../shared/domain/value-object';

export interface IUserFirstNameProperties {
  value: string;
}

export class UserFirstName extends ValueObject<IUserFirstNameProperties> {
  private static minLength = 2;
  private static maxLength = 10;

  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserFirstNameProperties) {
    super(properties);
  }

  get value() {
    return this.props.value;
  }

  private static isValid(firstName: string): Either<UserInputError, true> {
    const schema = z.string().min(this.minLength).max(this.maxLength);

    const parsed = schema.safeParse(firstName);
    if (!parsed.success) {
      return left(new UserInputError(parsed.error.message));
    }

    return right(parsed.success);
  }

  private static format(firstName: string) {
    return firstName.trim();
  }

  public static create(
    firstName: string,
  ): Either<UserInputError, UserFirstName> {
    const validOrError = this.isValid(firstName);
    if (isLeft(validOrError)) return validOrError;

    return right(new UserFirstName({ value: this.format(firstName) }));
  }
}
