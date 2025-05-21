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
import CommentController from '../comments/comment.controller';
import { commentIdSchema, createCommentSchema } from '../comments/comment.validation';
const ticketController = new TicketController();
const commentController = new CommentController();
const {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  updateTicketStatus,
  updateTicket,
} = ticketController;

const {
  addComment,
  deleteComment,
  getAllCommentsByTicketId
} = commentController;

const ticketRouter = Router();
ticketRouter.use(authMiddleware);

// Tickets
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

// Comments

ticketRouter.post('/:id/comments', validate(ticketIdSchema, 'params'), validate(createCommentSchema, 'body'), addComment);
ticketRouter.delete("/:id/comments/:commentId", validate(ticketIdSchema,'params'), validate(commentIdSchema,'params'),deleteComment);
ticketRouter.get('/:id/comments',getAllCommentsByTicketId);
export default ticketRouter;
