import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { StatusCode } from '@utils/status-code';
import { config } from '@config';
const authService = new AuthService();
const { registerUser, loginUser } = authService;
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
      res
        .status(StatusCode.OK)
        .json({ message: 'User logged in successfully', token });
      res.cookie('refreshToken', authToken?.refreshToken, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        maxAge: config.refreshTokenExpiresIn,
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {}
}

export default AuthController;
