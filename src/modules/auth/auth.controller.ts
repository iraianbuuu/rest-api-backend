import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { StatusCode } from '../../utils/status-code';

const authService = new AuthService();
const { registerUser, loginUser } = authService;
class AuthController {
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password, name, role, project } = req.body;
      await registerUser(email, password, name, role, project);
      res
        .status(StatusCode.CREATED)
        .json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const authToken = await loginUser(email, password);
      res
        .status(StatusCode.OK)
        .json({ message: 'User logged in successfully', authToken });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
