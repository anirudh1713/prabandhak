export abstract class ErrorBase extends Error {
  abstract code: string;

  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}

export type WrappedError<E extends Error> = {
  _tag: 'WrappedError'
  error: NonNullable<E>
}
 
export const wrappedError = <E extends Error>(error: E) => ({
  _tag: 'WrappedError',
  error
})
