import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';
import { StatusCode } from '../../utils/status-code';
import { UserResponse } from './user.model';
import { NotFoundException } from '../../exceptions/custom.exception';
const userService = new UserService();
const { getUsersById, updateUserById, deleteUserById } = userService;

class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await getUsersById(id);
      if (!user) {
        throw new NotFoundException(`Account with id: ${id} not found`);
      }
      const response: UserResponse = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        project: user?.project,
      };
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, role, project } = req.body;
      const user = await updateUserById(id, name, email, role, project);
      if (!user) {
        throw new NotFoundException(`Account with id: ${id} not found`);
      }
      const response: UserResponse = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        project: user?.project,
      };
      res
        .status(StatusCode.OK)
        .json({ message: 'Account updated successfully', response });
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
        .json({ message: 'Account deleted successfully', user });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
