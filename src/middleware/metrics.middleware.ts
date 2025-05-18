import { Request, Response, NextFunction } from 'express';
import { httpRequestCounter, httpRequestDuration } from '@utils/metrics';

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = process.hrtime();
  const path = req.path || req.route?.path;
  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationInMilliSeconds = duration[0] * 1000 + duration[1] / 1e6;
    httpRequestDuration.observe(
      {
        method: req.method,
        path: path,
        status: res.statusCode,
      },
      durationInMilliSeconds,
    );

    httpRequestCounter.inc({
      method: req.method,
      path: path,
      status: res.statusCode,
    });
  });
  next();
};
