import { Project, Role } from '@prisma/client';
import prisma from '@config/prisma';
import { handleError } from '@utils/index';
import { UnauthorizedException } from '@exceptions/custom.exception';
import { UserPayload } from '../users/user.model';
import { hash, compare } from 'bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@utils/jwt';
import { config } from '@config';
export class AuthService {
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

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + config.refreshTokenExpiresIn),
        },
      });
      return { accessToken, refreshToken };
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = verifyRefreshToken(refreshToken) as UserPayload;
      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          isValid: true,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!storedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const newRefreshToken = generateRefreshToken(user);

      // Update the old refresh token to be invalid
      await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: {
          isValid: false,
        },
      });

      // Create a new refresh token
      await prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + config.refreshTokenExpiresIn),
        },
      });
      return { refreshToken: newRefreshToken };
    } catch (error) {
      handleError(error);
    }
   }
}

export default AuthService;
