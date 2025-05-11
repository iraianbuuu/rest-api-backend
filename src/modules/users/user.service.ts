import prisma from '../../config/prisma';
import { Role } from '@prisma/client';
import { handleError } from '../../utils';
import { NotFoundException } from '../../exceptions/custom.exception';

class UserService {
  private findUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Account with id: ${id} not found`);
    }
    return user;
  };

  getUsersById = async (id: string) => {
    try {
      return await this.findUserById(id);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  updateUserById = async (
    id: string,
    name: string,
    email: string,
    role: string,
    project: string,
  ) => {
    try {
      await this.findUserById(id);
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          role: role as Role,
          project,
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

  getUsers = async () => {
    try {
      return await prisma.user.findMany();
    } catch (error: unknown) {
      handleError(error);
    }
  };
}

export default UserService;
