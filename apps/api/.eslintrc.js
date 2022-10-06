// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  ignorePatterns: ['**/generated/*'],
  extends: [
    'standard',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
  },
};
