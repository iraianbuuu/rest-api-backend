import { Router } from 'express';
import UserController from './user.controller';
const userRouter = Router();
const userController = new UserController();
const { getUsersById, updateUserById, deleteUserById } = userController;

userRouter.get('/:id', getUsersById);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);

export default userRouter;
