import { Either } from 'fp-ts/lib/Either';
import { InternalServerError } from '../../lib/errors/custom-errors';

/**
 * Either type wrapped by promise, which may return an InternalServerError.
 */
export type PromiseEither<E, T> = Promise<Either<E | InternalServerError, T>>;
