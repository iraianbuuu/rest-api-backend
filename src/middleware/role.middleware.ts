import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '@exceptions/custom.exception';
import { Role } from '@prisma/client';

export const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user || (user.role !== Role.ADMIN && user.role !== Role.TECH_LEAD)) {
      throw new ForbiddenException(
        'Forbidden. Only admins or tech leads can access this route.',
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};