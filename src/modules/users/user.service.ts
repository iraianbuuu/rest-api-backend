import prisma from '../../config/prisma';
import { prismaError } from 'prisma-better-errors';
import { Role } from '@prisma/client';
class UserService {
  async getUsersById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new prismaError(error);
    }
  }

  async updateUserById(
    id: string,
    name: string,
    email: string,
    role: string,
    project: string,
  ) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          name: name,
          email: email,
          role: role as Role,
          project: project,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new prismaError(error);
    }
  }

  async deleteUserById(id: string) {
    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new prismaError(error);
    }
  }
}

export default UserService;
