import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { z } from 'zod';
import { InvalidUserInputError } from '../../../lib/errors';
import { ValueObject } from '../../../shared/domain/value-object';

export interface IUserLastNameProperties {
  value: string;
}

export class UserLastName extends ValueObject<IUserLastNameProperties> {
  private static minLength = 2;
  private static maxLength = 10;
  //
  // eslint-disable-next-line no-useless-constructor
  private constructor(properties: IUserLastNameProperties) {
    super(properties);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValid(lastName: string): Either<InvalidUserInputError, true> {
    const schema = z.string().min(this.minLength).max(this.maxLength);

    const parsed = schema.safeParse(lastName);

    if (!parsed.success) {
      return left(new InvalidUserInputError(parsed.error.message));
    }

    return right(parsed.success);
  }

  private static format(lastName: string) {
    return lastName.trim();
  }

  public static create(lastName: string): Either<InvalidUserInputError, UserLastName> {
    const validOrError = this.isValid(lastName);
    if (isLeft(validOrError)) return validOrError;

    return right(new UserLastName({ value: this.format(lastName) }));
  }
}
