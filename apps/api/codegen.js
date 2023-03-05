module.exports = {
  schema: './src/modules/**/graphql/typedefs/*.graphql',
  generates: {
    './src/modules/': {
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: '../generated/graphql.ts',
        filename: 'generated/module-types.ts',
      },
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        {
          add: {
            content: "import * as E from '@/lib/errors';",
          },
        },
        {
          add: {
            content: "import * as UserError from '@/modules/user/errors';",
          },
        },
      ],
      config: {
        typesPrefix: 'GQL',
        useIndexSignature: true,
        useImplementingTypes: true,
        mappers: {
          InvalidUserInputError: 'E.WrappedError<E.InvalidUserInputError>',
          UserAlreadyExistsError: 'E.WrappedError<UserError.UserAlreadyExistError>',
          UserNotFoundError: 'E.WrappedError<UserError.UserNotFoundError>',
        }
      },
    },
  },
  hooks: {
    afterOneFileWrite: 'prettier --write',
  },
};
