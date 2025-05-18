import { Project, Role } from '@prisma/client';
import prisma from '@config/prisma';
import jwt from 'jsonwebtoken';
import { config } from '@config';
import { handleError } from '@utils/index';
import { UnauthorizedException } from '@exceptions/custom.exception';
import { UserPayload } from '../users/user.model';
class AuthService {
  async registerUser(
    email: string,
    password: string,
    name: string,
    role: string,
    project: string,
  ) {
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password,
          role: role as Role,
          project: project as Project,
        },
      });
    } catch (error: unknown) {
      handleError(error);
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
          role: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const userPayload: UserPayload = {
        id: user.id,
        name: user.name,
        role: user.role as Role,
      };
      const token = jwt.sign(userPayload, config.secretKey, {
        expiresIn: '1h',
      });
      return { token };
    } catch (error: unknown) {
      handleError(error);
    }
  }
}

export default AuthService;
