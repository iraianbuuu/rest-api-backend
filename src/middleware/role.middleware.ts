import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../exceptions/custom.exception';
import { Role } from '@prisma/client';

export const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user || user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Forbidden. Only admins can access this route.',
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
