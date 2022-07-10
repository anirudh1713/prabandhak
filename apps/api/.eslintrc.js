// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'plugin:unicorn/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
