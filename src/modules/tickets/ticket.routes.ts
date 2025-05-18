import { Router } from 'express';
import { authMiddleware } from '@middleware/auth.middleware';
import { roleMiddleware } from '@middleware/role.middleware';
import { validate } from '@middleware/validate.middleware';
import { createTicketSchema, getTicketByIdSchema } from './ticket.validation';
import TicketController from './ticket.controller';
const ticketController = new TicketController();
const { createTicket, getTicketById } = ticketController;

const ticketRouter = Router();
ticketRouter.use(authMiddleware);

// ticketRouter.get('/', roleMiddleware);
ticketRouter.post('/', validate(createTicketSchema, 'body'), createTicket);
ticketRouter.get(
  '/:id',
  validate(getTicketByIdSchema, 'params'),
  getTicketById,
);
// ticketRouter.put('/:id');
// ticketRouter.patch('/:id/status');
// ticketRouter.delete('/:id');

export default ticketRouter;
