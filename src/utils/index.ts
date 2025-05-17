import { Prisma } from '@prisma/client';
import { prismaError } from 'prisma-better-errors';
import { BadRequestException } from '../exceptions/custom.exception';
import { config } from '../config';

export const handleError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new prismaError(error);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestException();
  }
  throw error;
};

export const getPaginationationParameters = (page: string, perPage: string) => {
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);

  const validPage = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  const validPerPage =
    isNaN(perPageNumber) || perPageNumber < 1
      ? config.defaultPageSise
      : perPageNumber;

  const limit = validPerPage;
  const offset = (validPage - 1) * validPerPage;

  return { page: validPage, perPage: validPerPage, limit, offset };
};
