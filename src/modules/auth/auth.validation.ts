import { z } from 'zod';
import { ROLES } from '../shared';

export const registerUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(5, { message: 'Name must be at least 5 character long' }),
  project: z.string({
    required_error: 'Project is required',
    invalid_type_error: 'Project must be a string',
  }),
  role: z.enum(ROLES, {
    invalid_type_error: `Role must be one of the following: ${ROLES.join(', ')}`,
    required_error: 'Role is required',
  }),
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const loginUserSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
