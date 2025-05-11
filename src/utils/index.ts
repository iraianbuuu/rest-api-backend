// src/utils/prisma-error-handler.ts
import { Prisma } from '@prisma/client';
import { prismaError } from 'prisma-better-errors';

export const handleError = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new prismaError(error);
  }
  throw error;
};
