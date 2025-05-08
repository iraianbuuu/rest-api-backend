import { Role } from '@prisma/client';
import prisma from '../../config/prisma';
import { prismaError } from 'prisma-better-errors';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
class AuthService {
  async registerUser(
    email: string,
    password: string,
    name: string,
    role: string,
    project: string,
  ) {
    try {
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
        throw new Error('Unable to create user');
      }
    } catch (error: any) {
      throw new prismaError(error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
          password,
        },
        select: {
          id: true,
          name: true,
        },
      });
      const token = jwt.sign(
        { id: user?.id, name: user?.name },
        config.secretKey,
        { expiresIn: '1h' },
      );
      return { token };
    } catch (error: any) {
      throw new prismaError(error);
    }
  }
}

export default AuthService;
