import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '@utils/status-code';
import { UserPayload } from '@modules/users/user.model';
import { BadRequestException, UnauthorizedException } from '@exceptions/custom.exception';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '@utils/jwt';
import AuthService from '@modules/auth/auth.service';

const authService = new AuthService();
const { refreshToken: refreshTokenService } = authService;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userRefreshToken = req.cookies.refreshToken;
  if (!token && !userRefreshToken) {
    res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Unauthorized access, no token provided' });
    return;
  }

  try {
    if (token) {
      try {
        const decoded = verifyAccessToken(token as string);
        req.user = decoded as UserPayload;
        next();
        return;
      } catch (error) {
        // Access token is invalid, try refresh token
        if (!userRefreshToken) {
          throw new UnauthorizedException('Access denied. No refresh token provided');
        }
      }
    }
    // Try to use refresh token
    if (userRefreshToken) {
      try {
        const userPayload = verifyRefreshToken(userRefreshToken) as UserPayload;
        const { name, role, id } = userPayload;
        const newAccessToken = generateAccessToken({ name, role, id });
        res.header('Authorization', `Bearer ${newAccessToken}`);
        req.user = userPayload;
        next();
        return;
      } catch (error) {
        console.log('Error', error);
        next(new BadRequestException('Invalid refresh token'));
      }
    } else {
      next(new UnauthorizedException('Authentication failed'));
    }
  } catch (error: unknown) {
    next(error);
  }
};
