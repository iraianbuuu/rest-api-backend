import { Role } from '@prisma/client';
import prisma from '../../config/prisma';

class AuthService {
  async registerUser(
    email: string,
    password: string,
    name: string,
    role: string,
    project: string,
  ) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role as Role,
        project,
      },
    });

    if (!user) {
      throw new Error('User not created');
    }
    return user;
  }

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default AuthService;
