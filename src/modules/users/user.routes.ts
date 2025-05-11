import { Router } from 'express';
import UserController from './user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { validate } from '../../middleware/validate.middleware';
import { updateUserValidation } from './user.validation';
const userRouter = Router();
const userController = new UserController();
const { getUserById, updateUserById, deleteUserById, getUsers } =
  userController;

userRouter.get('/:id', authMiddleware, getUserById);
userRouter.put(
  '/:id',
  validate(updateUserValidation),
  authMiddleware,
  updateUserById,
);
userRouter.delete('/:id', authMiddleware, roleMiddleware, deleteUserById);
userRouter.get('/', authMiddleware, roleMiddleware, getUsers);

export default userRouter;
