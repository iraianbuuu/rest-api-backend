import prisma from '@config/prisma';
import { Priority, Prisma, Status } from '@prisma/client';
import {
  ITicketQueryParams,
  TicketRequest,
  TicketUpdateRequest,
} from './ticket.model';
import { handleError } from '@utils/index';
import { NotFoundException } from '@exceptions/custom.exception';
import { Project } from '@prisma/client';
class TicketRepository {
  createTicket = async (_ticket: TicketRequest) => {
    try {
      const {
        title,
        workType,
        description,
        project,
        status,
        priority,
        assignedToId,
        createdById,
      } = _ticket;
      const createdTicket = await prisma.ticket.create({
        data: {
          title,
          workType,
          description,
          project,
          status,
          priority,
          assignedToId,
          createdById,
        },
      });
      return createdTicket;
    } catch (error) {
      handleError(error);
    }
  };
  getTicketById = async (id: string) => {
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id, isDeleted: false },
      });
      if (!ticket) {
        throw new NotFoundException(
          'Ticket not found. Please check the ticket id',
        );
      }
      return ticket;
    } catch (error) {
      handleError(error);
    }
  };

  getTickets = async (
    queryParams: ITicketQueryParams,
    limit: number,
    offset: number,
  ) => {
    try {
      const conditions: Prisma.TicketWhereInput = {
        project: queryParams.project as Project,
        status: queryParams.status as Status,
        priority: queryParams.priority as Priority,
        isDeleted: false,
      };

      const tickets = await prisma.ticket.findMany({
        where: conditions,
        orderBy: queryParams.sort as Prisma.TicketOrderByWithRelationInput,
        skip: offset,
        take: limit,
      });
      const totalTickets = await prisma.ticket.count({ where: conditions });
      return { tickets, totalTickets };
    } catch (error: unknown) {
      handleError(error);
    }
  };

  deleteTicket = async (id: string, userId: string) => {
    try {
      const deletedTicket = await prisma.ticket.update({
        where: { id },
        data: { isDeleted: true, deletedById: userId },
      });
      if (!deletedTicket) {
        throw new NotFoundException('Unable to delete ticket. No ticket found');
      }
      return deletedTicket;
    } catch (error) {
      handleError(error);
    }
  };

  updateTicketStatus = async (id: string, status: Status) => {
    try {
      const { status: updatedStatus } = await prisma.ticket.update({
        where: { id },
        data: { status },
      });
      if (!updatedStatus) {
        throw new NotFoundException(
          'Unable to update ticket status. No ticket found',
        );
      }
      return updatedStatus;
    } catch (error) {
      handleError(error);
    }
  };

  updateTicket = async (id: string, ticket: TicketUpdateRequest) => {
    try {
      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: ticket,
      });
      return updatedTicket;
    } catch (error) {
      handleError(error);
    }
  };
}
export default TicketRepository;
