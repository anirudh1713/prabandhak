export const config = {
  env: {
    port: process.env.PORT || '3001',
    isProduction: process.env.NODE_ENV === 'production',
    dbConnectionUrl:
      process.env.DB_CONNECTION_URL ||
      'postgresql://admin:admin@localhost/prabandhak',
    saltRounds: process.env.SALT_ROUNDS || 10,
  },
};
