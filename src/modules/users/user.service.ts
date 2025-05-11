import prisma from '../../config/prisma';
import { Role } from '@prisma/client';
import { handleError } from '../../utils';
class UserService {
  async getUsersById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error: unknown) {
      handleError(error);
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
      return user;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async deleteUserById(id: string) {
    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async getUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error: unknown) {
      handleError(error);
    }
  }
}

export default UserService;
