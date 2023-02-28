import { ValueObject } from '../../../shared/domain/value-object';
import { z } from 'zod';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { UserInputError } from 'apollo-server-errors';

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

  private static isValid(email: string): Either<UserInputError, true> {
    const schema = z.string().email();

    const parsed = schema.safeParse(email);

    if (!parsed.success) {
      return left(new UserInputError(parsed.error.message));
    }

    return right(parsed.success);
  }

  private static format(email: string) {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Either<UserInputError, UserEmail> {
    const isValidOrError = this.isValid(email);
    if (isLeft(isValidOrError)) return isValidOrError;

    return right(new UserEmail({ value: this.format(email) }));
  }
}
