import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  secretKey: string;
  baseUrl: string;
  defaultPageSise: number;
  redisHost: string;
  redisPort: number;
  lokiHost: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  secretKey: process.env.SECRET_KEY as string,
  baseUrl: process.env.BASE_URL as string,
  defaultPageSise: parseInt(process.env.DEFAULT_PAGE_SIZE || '5'),
  redisHost: process.env.REDIS_HOST as string,
  redisPort: parseInt(process.env.REDIS_PORT || '6379'),
  lokiHost: process.env.LOKI_HOST as string,
};
