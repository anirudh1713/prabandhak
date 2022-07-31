export const config = {
  env: {
    port: process.env.PORT || '3001',
    isProduction: process.env.NODE_ENV === 'production',
  },
};
