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
      ],
      config: {
        typesPrefix: 'GQL',
        useIndexSignature: true,
        useImplementingTypes: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: 'prettier --write',
  },
};
