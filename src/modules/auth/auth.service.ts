import { Project, Role } from '@prisma/client';
import prisma from '@config/prisma';
import jwt from 'jsonwebtoken';
import { config } from '@config';
import { handleError } from '@utils/index';
import { UnauthorizedException } from '@exceptions/custom.exception';
import { UserPayload } from '../users/user.model';
import { hash, compare } from 'bcrypt';
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
          password: await hash(password, 10),
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
        },
        select: {
          id: true,
          name: true,
          role: true,
          password: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
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
