import { Router } from 'express';
import { authMiddleware } from '@middleware/auth.middleware';
import { roleMiddleware } from '@middleware/role.middleware';
import { validate } from '@middleware/validate.middleware';
import {
  createTicketSchema,
  getTicketsSchema,
  ticketIdSchema,
  updateTicketSchema,
} from './ticket.validation';
import TicketController from './ticket.controller';
const ticketController = new TicketController();
const {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  updateTicketStatus,
  updateTicket,
} = ticketController;

const ticketRouter = Router();
ticketRouter.use(authMiddleware);

ticketRouter.get(
  '/',
  validate(getTicketsSchema, 'query'),
  roleMiddleware,
  getTickets,
);
ticketRouter.post('/', validate(createTicketSchema, 'body'), createTicket);
ticketRouter.get('/:id', validate(ticketIdSchema, 'params'), getTicketById);
ticketRouter.put(
  '/:id',
  validate(ticketIdSchema, 'params'),
  validate(updateTicketSchema, 'body'),
  updateTicket,
);
ticketRouter.patch(
  '/:id/status',
  validate(ticketIdSchema, 'params'),
  updateTicketStatus,
);
ticketRouter.delete('/:id', validate(ticketIdSchema, 'params'), deleteTicket);

export default ticketRouter;
