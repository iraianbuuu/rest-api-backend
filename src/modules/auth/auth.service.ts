import { Project, Role } from '@prisma/client';
import prisma from '@config/prisma';
import { handleError } from '@utils/index';
import { UnauthorizedException } from '@exceptions/custom.exception';
import { UserPayload } from '../users/user.model';
import { hash, compare } from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '@utils/jwt';
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
      const accessToken = generateAccessToken(userPayload);
      const refreshToken = generateRefreshToken(userPayload);
      return { accessToken, refreshToken };
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async refreshToken(refreshToken: string) { }
}

export default AuthService;
