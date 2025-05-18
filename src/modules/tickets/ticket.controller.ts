import { Request, Response, NextFunction } from 'express';
import { TicketService } from './ticket.service';
import { StatusCode } from '@utils/status-code';
import {
  TicketRequest,
  ITicketQueryParams,
  TicketUpdateRequest,
} from './ticket.model';
import { getPaginationationParameters } from '@utils/index';
import { parseTicketSortByQueryParams, statusTransition } from './ticket.utils';
import { Role, Status } from '@prisma/client';
import {
  BadRequestException,
  NotFoundException,
} from '@exceptions/custom.exception';

const ticketService = new TicketService();
const {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  updateTicketStatus,
  updateTicket,
} = ticketService;
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

  deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      await deleteTicket(id, userId);
      res.status(StatusCode.OK).json({
        message: 'Ticket deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  updateTicketStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const { status } = req.body;
    let currentTicketStatus;
    try {
      const ticket = await getTicketById(id);
      if (!ticket) {
        throw new NotFoundException('Ticket not found');
      }
      currentTicketStatus = ticket.status;
      const { updatedStatus, nextStatuses } = await updateTicketStatus(
        id,
        status,
      );
      res.status(StatusCode.OK).json({
        message: `Ticket status updated from ${ticket.status} to ${updatedStatus}`,
        links: nextStatuses.map((nextStatus) => ({
          rel: 'next',
          method: 'PATCH',
          href: `/api/v1/tickets/${id}/status`,
          body: { status: nextStatus },
        })),
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(StatusCode.BAD_REQUEST).json({
          message: error.message,
          links: statusTransition[currentTicketStatus as Status].map(
            (nextStatus) => ({
              rel: 'next',
              method: 'PATCH',
              href: `/api/v1/tickets/${id}/status`,
              body: { status: nextStatus },
            }),
          ),
        });
        return;
      } else {
        next(error);
      }
    }
  };

  updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ticket = req.body as TicketUpdateRequest;
      const updatedTicket = await updateTicket(id, ticket);
      console.log(updateTicket);
      res.status(StatusCode.OK).json({
        message: 'Ticket updated successfully',
        data: updatedTicket,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketController;
