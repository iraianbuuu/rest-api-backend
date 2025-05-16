import { Router } from 'express';
import UserController from './user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { validate } from '../../middleware/validate.middleware';
import { updateUserValidation } from './user.validation';
const userRouter = Router();
userRouter.use(authMiddleware);
const userController = new UserController();
const { getUserById, updateUserById, deleteUserById, getUsers } =
  userController;

userRouter.get('/:id', getUserById);
userRouter.put('/:id', validate(updateUserValidation, 'body'), updateUserById);
userRouter.delete('/:id', roleMiddleware, deleteUserById);
userRouter.get('/', roleMiddleware, getUsers);

export default userRouter;
