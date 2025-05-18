import Redis from 'ioredis';
import { config } from './index';

const client = new Redis({
  host: config.redisHost,
  port: config.redisPort,
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export default client;
