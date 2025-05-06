import { Request, Response } from 'express';
import AuthService from './auth.service';
import { StatusCode } from '../../utils/status-code';

const authService = new AuthService();
const { registerUser, loginUser } = authService;
class AuthController {
  async registerUser(req: Request, res: Response): Promise<void> {
    const { name, project, role, email, password } = req.body;
    await registerUser(email, password, name, role, project);
    res
      .status(StatusCode.CREATED)
      .json({ message: 'User created successfully' });
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    await loginUser(email, password);
    res.status(StatusCode.OK).json({ message: 'User logged in successfully' });
  }
}

export default AuthController;
