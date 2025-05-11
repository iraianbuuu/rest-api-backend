import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCode } from '../utils/status-code';
import { config } from '../config';
import { UserPayload } from '../modules/users/user.model';
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
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded as UserPayload;
    next();
  } catch (error: unknown) {
    res.status(StatusCode.BAD_REQUEST).json({ message: 'Invalid token' });
    next(error);
  }
};
