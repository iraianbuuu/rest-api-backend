import { z } from 'zod';
import { ROLES, PROJECTS, SORT_BY_REGEX } from '../shared';

export const updateUserValidation = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(5, {
      message: 'Name must be at least 5 character long',
    }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Invalid email',
    }),
  role: z.enum(ROLES, {
    message: `Role must be one of the following: ${ROLES.join(', ')}`,
  }),
  project: z.enum(PROJECTS, {
    message: `Project must be one of the following: ${PROJECTS.join(', ')}`,
  }),
});

export const getUsersValidation = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  role: z
    .enum(ROLES, {
      message: `Role must be one of the following: ${ROLES.join(', ')}`,
    })
    .optional(),
  project: z
    .enum(PROJECTS, {
      message: `Project must be one of the following: ${PROJECTS.join(', ')}`,
    })
    .optional(),
  sort: z
    .string()
    .regex(SORT_BY_REGEX, {
      message: `Sort must be in the format 'name:asc', 'name:desc', 'project:asc', or 'project:desc'`,
    })
    .optional(),
});
