import { Router } from 'express';
import UserController from './user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
const userRouter = Router();
const userController = new UserController();
const { getUserById, updateUserById, deleteUserById, getUsers } =
  userController;

userRouter.get('/:id', authMiddleware, getUserById);
userRouter.put('/:id', authMiddleware, updateUserById);
userRouter.delete('/:id', authMiddleware, deleteUserById);
userRouter.get('/', authMiddleware, getUsers);

export default userRouter;
