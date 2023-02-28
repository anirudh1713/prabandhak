import { ValidationError } from 'apollo-server-errors';
import { Either, left, right } from 'fp-ts/lib/Either';
import { z } from 'zod';
import { ValueObject } from '../value-object';

export interface ITimestampProperties {
  value: string | undefined;
}

export class Timestamp<T extends ITimestampProperties> extends ValueObject<T> {
  // eslint-disable-next-line no-useless-constructor
  public constructor(properties: T) {
    super(properties);
  }

  protected static isValid(timestamp: Date): Either<ValidationError, true> {
    const parsed = z.date().safeParse(timestamp);

    if (!parsed.success) {
      return left(new ValidationError(parsed.error.message));
    }

    return right(parsed.success);
  }

  protected static format(timestamp: Date) {
    return timestamp.toISOString();
  }
}
