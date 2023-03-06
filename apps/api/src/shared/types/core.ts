import { Either } from 'fp-ts/lib/Either';

/**
 * Either type wrapped by promise.
 */
export type PromiseEither<E, T> = Promise<Either<E, T>>;
