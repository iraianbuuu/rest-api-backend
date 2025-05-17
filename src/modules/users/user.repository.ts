import { Role, Project, Prisma } from '@prisma/client';
import { NotFoundException } from '../../exceptions/custom.exception';
import prisma from '../../config/prisma';
import { handleError } from '../../utils';
import { IUserQueryParams } from './user.model';
class UserRepository {
  findUserById = async (id: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Account with id: ${id} not found`);
      }
      return user;
    } catch (error: unknown) {
      handleError(error);
    }
  };
  updateUserById = async (
    id: string,
    name: string,
    email: string,
    role: Role,
    project: Project,
  ) => {
    try {
      await this.findUserById(id);
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          role: role as Role,
          project: project as Project,
        },
      });
      return updatedUser;
    } catch (error: unknown) {
      handleError(error);
    }
  };
  deleteUserById = async (id: string) => {
    try {
      await this.findUserById(id);
      return await prisma.user.delete({ where: { id } });
    } catch (error: unknown) {
      handleError(error);
    }
  };
  getUsers = async (
    queryParams: IUserQueryParams,
    limit: number,
    offset: number,
  ) => {
    try {
      const conditions: Prisma.UserWhereInput = {
        role: queryParams.role as Role,
        project: queryParams.project as Project,
      };

      // Exclude admin details if the role in queryParams is TECH_LEAD
      if (queryParams.role === 'TECH_LEAD') {
        conditions.role = { not: 'ADMIN' };
      }

      const users = await prisma.user.findMany({
        where: conditions,
        orderBy: queryParams.sort as Prisma.UserOrderByWithRelationInput,
        skip: offset,
        take: limit,
      });
      const totalUsers = await prisma.user.count({ where: conditions });
      return { users, totalUsers };
    } catch (error: unknown) {
      handleError(error);
    }
  };
}

export default UserRepository;
