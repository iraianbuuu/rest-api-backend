import { Request, Response, NextFunction } from 'express';
import { GlobalException } from '../exceptions/global.exception';
import logger from '../utils/logger';
import { prismaError } from 'prisma-better-errors';
import { InternalServerErrorException } from '../exceptions/custom.exception';
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof GlobalException) {
    logger.error(err.message);
    return GlobalException.handle(err, res);
  } else if (err instanceof prismaError) {
    logger.error(err.message);
    res.status(err.statusCode).json({
      message: err.message,
      metaData: err.metaData,
    });
  } else {
    logger.error({ message: err.message });
    const internalError = new InternalServerErrorException(err.message);
    return GlobalException.handle(internalError, res);
  }
};
