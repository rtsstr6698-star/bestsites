import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'change_me_access',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change_me_refresh',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  appMode: (process.env.APP_MODE ?? 'DIRECT_DISTRIBUTION') as 'DIRECT_DISTRIBUTION' | 'PLAY_STORE_COMPLIANT',
  paymentProvider: process.env.PAYMENT_PROVIDER ?? 'mock',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost:3000'
};
