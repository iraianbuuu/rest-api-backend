import { Prisma } from '@prisma/client';
import { prismaError } from 'prisma-better-errors';
import { BadRequestException } from '../exceptions/custom.exception';
export const handleError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new prismaError(error);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestException();
  }
  throw error;
};
