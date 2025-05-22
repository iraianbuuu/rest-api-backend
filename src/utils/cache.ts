import redis from '@config/redis';
import { Request } from 'express';
import zlib from 'node:zlib';
import hash from 'object-hash';
import { EXPIRE_TIME, TTL } from './index';
const generateCacheKey = (req: Request) => {
  const hashValue = {
    query: req.query,
  };
  const key = `${req.originalUrl}@${hash.sha1(hashValue)}`;
  return key;
};

const readDataFromCache = async (key: string) => {
  try {
    const data = await redis.get(key);
    if (data) {
      const decompressedData = zlib.inflateSync(Buffer.from(data, 'base64'));
      return decompressedData.toString();
    }
    return null;
  } catch (error) {
    console.error('Error reading data from cache', error);
    return null;
  }
};

const writeDataToCache = async (key: string, data: string) => {
  const compressedData = zlib.deflateSync(data).toString('base64');

  try {
    // Cache for 10 minutes
    await redis.set(key, compressedData, EXPIRE_TIME, TTL);
  } catch (error) {
    console.error('Error writing data to cache', error);
  }
};

export { generateCacheKey, readDataFromCache, writeDataToCache };
