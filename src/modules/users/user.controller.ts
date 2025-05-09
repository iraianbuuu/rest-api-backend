import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';
import { StatusCode } from '../../utils/status-code';
const userService = new UserService();
const { getUsersById, updateUserById, deleteUserById } = userService;

class UserController {
  async getUsersById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await getUsersById(id);
      res.status(StatusCode.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, role, project } = req.body;
      const user = await updateUserById(id, name, email, role, project);
      res
        .status(StatusCode.OK)
        .json({ message: 'User updated successfully', user });
    } catch (error) {
      next(error);
    }
  }
  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await deleteUserById(id);
      res
        .status(StatusCode.OK)
        .json({ message: 'User deleted successfully', user });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
