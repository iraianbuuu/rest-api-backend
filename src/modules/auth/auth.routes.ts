import { Router } from 'express';
import AuthController from './auth.controller';
import { validate } from '@middleware/validate.middleware';
import { registerUserSchema, loginUserSchema } from './auth.validation';
const authRouter = Router();

const authController = new AuthController();

const { registerUser, loginUser } = authController;

authRouter.post(
  '/register',
  validate(registerUserSchema, 'body'),
  registerUser,
);

authRouter.post('/login', validate(loginUserSchema, 'body'), loginUser);
//authRouter.post('/refresh-token');

export default authRouter;
