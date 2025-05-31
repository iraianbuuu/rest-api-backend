import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '@utils/status-code';
import { UserPayload } from '@modules/users/user.model';
import { UnauthorizedException } from '@exceptions/custom.exception';
import { verifyAccessToken } from '@utils/jwt';
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Unauthorized access' });
    return;
  }
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded as UserPayload;
    next();
  } catch (error: unknown) {
    next(new UnauthorizedException('Invalid token'));
  }
};
