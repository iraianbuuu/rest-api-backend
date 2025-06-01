import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { StatusCode } from '@utils/status-code';
import { config } from '@config';
import { UnauthorizedException } from '@exceptions/custom.exception';
const authService = new AuthService();
const { registerUser, loginUser, refreshToken } = authService;
class AuthController {
  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password, name, role, project } = req.body;
      const user = await registerUser(email, password, name, role, project);
      res
        .status(StatusCode.CREATED)
        .json({ message: 'User created successfully', user });
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const authToken = await loginUser(email, password);
      const token = authToken?.accessToken;
      res.cookie('refreshToken', authToken?.refreshToken, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        maxAge: config.refreshTokenExpiresIn,
      })
        .status(StatusCode.OK)
        .json({ message: 'User logged in successfully', token });

    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userRefreshToken = req.cookies.refreshToken;
      if (!userRefreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }
      const authToken = await refreshToken(userRefreshToken);
      const token = authToken?.refreshToken;
      res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        maxAge: config.refreshTokenExpiresIn,
      })
        .status(StatusCode.OK)
        .json({ message: 'Refresh token refreshed successfully'});
    } catch (error) {
      next(error);
    }
   }
}

export default AuthController;
