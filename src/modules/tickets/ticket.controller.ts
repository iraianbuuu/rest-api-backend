import { Request, Response, NextFunction } from 'express';
import { TicketService } from './ticket.service';
import { StatusCode } from '../../utils/status-code';
import { TicketRequest } from './ticket.model';
const ticketService = new TicketService();
const { createTicket, getTicketById } = ticketService;
class TicketController {
  createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticket = req.body as TicketRequest;
      const createdTicket = await createTicket(ticket);
      res.status(StatusCode.CREATED).json({
        message: 'Ticket created successfully',
        data: createdTicket,
      });
    } catch (error) {
      next(error);
    }
  };

  getTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ticket = await getTicketById(id);
      res.status(StatusCode.OK).json({
        message: 'Ticket fetched successfully',
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketController;
