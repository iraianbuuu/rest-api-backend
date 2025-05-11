import { Router } from 'express';
import UserController from './user.controller';
const userRouter = Router();
const userController = new UserController();
const { getUserById, updateUserById, deleteUserById } = userController;

userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);

export default userRouter;
