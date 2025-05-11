import { Prisma } from '@prisma/client';
import { prismaError } from 'prisma-better-errors';

export const handleError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new prismaError(error);
  }
  throw error;
};
