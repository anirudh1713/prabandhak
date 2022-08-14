import {ApolloError} from 'apollo-server-errors';

export class NotFoundError extends ApolloError {
  constructor(
    message: ApolloError['message'],
    extensions?: ApolloError['extensions'],
  ) {
    super(message, 'NOT_FOUND', extensions);
  }
}
