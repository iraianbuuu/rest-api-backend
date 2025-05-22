import { readDataFromCache, writeDataToCache } from '@utils/cache';
import { generateCacheKey } from '@utils/cache';
import { StatusCode } from '@utils/status-code';
import { Request, Response, NextFunction } from 'express';
import logger from '@utils/logger';

const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cacheKey = generateCacheKey(req);
    const cachedData = await readDataFromCache(cacheKey);

    // Cache hit
    if (cachedData) {
      try {
        res.status(StatusCode.OK).json(JSON.parse(cachedData));
      } catch (error) {
        res.status(StatusCode.OK).send(cachedData);
        logger.error('Cache read error:', error);
      }
    } else {
      // Cache miss
      const originalSend = res.send;

      res.send = function (body): Response {
        res.send = originalSend;

        // Cache the response if it's a success
        if (res.statusCode === StatusCode.OK) {
          writeDataToCache(cacheKey, body).catch((err) => {
            logger.error('Cache write error:', err);
          });
        }
        return res.send(body);
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default cacheMiddleware;
