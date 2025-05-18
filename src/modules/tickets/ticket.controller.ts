import { Request, Response, NextFunction } from 'express';
import { TicketService } from './ticket.service';
import { StatusCode } from '@utils/status-code';
import { TicketRequest, ITicketQueryParams } from './ticket.model';
import { getPaginationationParameters } from '@utils/index';
import { parseTicketSortByQueryParams } from './ticket.utils';
import { Role } from '@prisma/client';
import { NotFoundException } from '@exceptions/custom.exception';
const ticketService = new TicketService();
const { createTicket, getTicketById, getTickets } = ticketService;
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

  getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role, id } = req.user;
      const queryParams = req.query as ITicketQueryParams;
      const { page, perPage, limit, offset } = getPaginationationParameters(
        queryParams.page as string,
        queryParams.perPage as string,
      );
      queryParams.sort = parseTicketSortByQueryParams(
        queryParams.sort as string,
      );
      const tickets = await getTickets(
        role as Role,
        id,
        queryParams,
        limit,
        offset,
      );
      if (!tickets) {
        throw new NotFoundException('No tickets found');
      }

      res.status(StatusCode.OK).json({
        message: 'Tickets fetched successfully',
        data: tickets.tickets,
        page,
        perPage,
        total_pages: Math.ceil(tickets.totalTickets / limit),
        total_tickets: tickets.totalTickets,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketController;
