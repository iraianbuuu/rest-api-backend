import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { StatusCode } from '@utils/status-code';
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
      const token = authToken?.token;
      res
        .status(StatusCode.OK)
        .json({ message: 'User logged in successfully', token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
