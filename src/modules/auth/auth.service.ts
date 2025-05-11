import { Role } from '@prisma/client';
import prisma from '../../config/prisma';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { handleError } from '../../utils';
import { UnauthorizedException } from '../../exceptions/custom.exception';
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
          project,
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
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = jwt.sign(
        { id: user?.id, name: user?.name },
        config.secretKey,
        { expiresIn: '1h' },
      );
      return { token };
    } catch (error: unknown) {
      handleError(error);
    }
  }
}

export default AuthService;
