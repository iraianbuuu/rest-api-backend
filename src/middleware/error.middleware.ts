import { NextFunction, Request, Response } from 'express';
import { prismaError } from 'prisma-better-errors';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const status = err.status || 'error';

  if (err instanceof prismaError) {
    res.status(err.statusCode).json({
      message: err.message,
      metaData: err.metaData,
    });
  } else {
    res.status(statusCode).json({
      status,
      message,
    });
  }
};
