import { z } from 'zod';
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  WORK_TYPE,
  PROJECTS,
  SORT_BY_TICKET_REGEX,
} from '../shared';
export const createTicketSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, { message: 'Title is required' }),
  workType: z.enum(WORK_TYPE, {
    required_error: 'Work type is required',
    invalid_type_error: `Ticket work type must be one of the following: ${WORK_TYPE.join(', ')}`,
  }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, { message: 'Description is required' }),
  project: z.enum(PROJECTS, {
    required_error: 'Project is required',
    invalid_type_error: `Ticket project must be one of the following: ${PROJECTS.join(', ')}`,
  }),
  status: z
    .enum(TICKET_STATUS, {
      required_error: 'Status is required',
      invalid_type_error: `Ticket status must be one of the following: ${TICKET_STATUS.join(', ')}`,
    })
    .optional(),
  priority: z
    .enum(TICKET_PRIORITY, {
      required_error: 'Priority is required',
      invalid_type_error: `Ticket priority must be one of the following: ${TICKET_PRIORITY.join(', ')}`,
    })
    .optional(),
  createdById: z.string().uuid({
    message: 'Reporter must be a valid uuid',
  }),
  assignedToId: z.string().uuid({
    message: 'Assigned to must be a valid uuid',
  }),
});

export const getTicketsSchema = z.object({
  project: z
    .enum(PROJECTS, {
      required_error: 'Project is required',
      invalid_type_error: `Ticket project must be one of the following: ${PROJECTS.join(', ')}`,
    })
    .optional(),
  status: z
    .enum(TICKET_STATUS, {
      required_error: 'Status is required',
      invalid_type_error: `Ticket status must be one of the following: ${TICKET_STATUS.join(', ')}`,
    })
    .optional(),
  priority: z
    .enum(TICKET_PRIORITY, {
      required_error: 'Priority is required',
      invalid_type_error: `Ticket priority must be one of the following: ${TICKET_PRIORITY.join(', ')}`,
    })
    .optional(),
  sort: z
    .string()
    .regex(SORT_BY_TICKET_REGEX, {
      message: `Sort must be one of the following: project:asc, project:desc`,
    })
    .optional(),
});

export const ticketIdSchema = z.object({
  id: z.string().uuid({
    message: 'Ticket id must be a valid uuid',
  }),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(TICKET_STATUS, {
    required_error: 'Status is required',
    invalid_type_error: `Ticket status must be one of the following: ${TICKET_STATUS.join(', ')}`,
  }),
});

export const updateTicketSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, { message: 'Title is required' })
    .optional(),
  workType: z
    .enum(WORK_TYPE, {
      required_error: 'Work type is required',
      invalid_type_error: `Ticket work type must be one of the following: ${WORK_TYPE.join(', ')}`,
    })
    .optional(),
  status: z
    .enum(TICKET_STATUS, {
      required_error: 'Status is required',
      invalid_type_error: `Ticket status must be one of the following: ${TICKET_STATUS.join(', ')}`,
    })
    .optional(),
  priority: z
    .enum(TICKET_PRIORITY, {
      required_error: 'Priority is required',
      invalid_type_error: `Ticket priority must be one of the following: ${TICKET_PRIORITY.join(', ')}`,
    })
    .optional(),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, { message: 'Description is required' })
    .optional(),
  createdById: z
    .string()
    .uuid({
      message: 'Reporter must be a valid uuid',
    })
    .optional(),
  assignedToId: z
    .string()
    .uuid({
      message: 'Assigned to must be a valid uuid',
    })
    .optional(),
});
