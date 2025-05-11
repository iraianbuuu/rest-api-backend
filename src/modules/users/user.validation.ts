import { z } from 'zod';
import { Roles } from '../shared/roles';

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
  role: z.enum(Roles, {
    message: `Role must be one of the following: ${Roles.join(', ')}`,
  }),
  project: z
    .string({
      required_error: 'Project is required',
      invalid_type_error: 'Project must be a string',
    })
    .min(5, {
      message: 'Project must be at least 5 character long',
    }),
});
