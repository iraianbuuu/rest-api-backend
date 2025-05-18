import { NextFunction, Request, Response } from 'express';
import client from '@config/redis';
import { StatusCode } from '@utils/status-code';
import { METRICS_URL } from '@utils/api';

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const path = req.path;

    // Skip rate limiting for metrics endpoint
    if (path === METRICS_URL) {
      return next();
    }

    const ip = req.ip;
    const key = `rate-limit:${ip}`;
    const limit = 5;
    const windowTime = 15 * 60;

    const requests = await client.incr(key);
    if (requests === 1) {
      await client.expire(key, windowTime);
    }

    if (requests > limit) {
      const remainingTime = await client.ttl(key);
      res.status(StatusCode.TOO_MANY_REQUESTS).json({
        message: `Too many requests, please try again after ${remainingTime} seconds`,
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimiter;
