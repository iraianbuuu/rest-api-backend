import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  accessTokenSecretKey: string;
  refreshTokenSecretKey: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  baseUrl: string;
  defaultPageSise: number;
  redisHost: string;
  redisPort: number;
  lokiHost: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY as string,
  refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY as string,
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY_TIME as string),
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRY_TIME as string),
  baseUrl: process.env.BASE_URL as string,
  defaultPageSise: parseInt(process.env.DEFAULT_PAGE_SIZE || '5'),
  redisHost: process.env.REDIS_HOST as string,
  redisPort: parseInt(process.env.REDIS_PORT || '6379'),
  lokiHost: process.env.LOKI_HOST as string,
};
