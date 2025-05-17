import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';
import { StatusCode } from '../../utils/status-code';
import { UserResponse, IUserQueryParams } from './user.model';
import { NotFoundException } from '../../exceptions/custom.exception';
import { Role } from '@prisma/client';
import { parseUserSortByQueryParams } from './user.utils';
import { getPaginationationParameters } from '../../utils';
const userService = new UserService();
const { updateUserById, deleteUserById, findUserById, getUsers } = userService;

class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = (await findUserById(id)) as UserResponse;
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
      const { role } = req.user;
      const user = await deleteUserById(id, role as Role);
      res
        .status(StatusCode.OK)
        .json({ message: 'Account deleted successfully', user });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { role, id } = req.user;
      const queryParams = req.query as IUserQueryParams;
      const { page, perPage, limit, offset } = getPaginationationParameters(
        queryParams.page as string,
        queryParams.perPage as string,
      );
      queryParams.sort = parseUserSortByQueryParams(queryParams.sort as string);

      const result = await getUsers(
        role as Role,
        id,
        queryParams,
        limit,
        offset,
      );

      if (!result) {
        throw new NotFoundException('No users found');
      }

      res.status(StatusCode.OK).json({
        message: 'Users fetched successfully',
        data: result.users,
        page,
        perPage,
        total_pages: Math.ceil(result.totalUsers / limit),
        total_users: result.totalUsers,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
