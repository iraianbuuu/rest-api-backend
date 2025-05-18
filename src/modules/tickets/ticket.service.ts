import { Role, Status } from '@prisma/client';
import {
  TicketRequest,
  ITicketQueryParams,
  TicketUpdateRequest,
} from './ticket.model';
import TicketRepository from './ticket.respository';
import {
  BadRequestException,
  NotFoundException,
} from '@exceptions/custom.exception';
import UserService from '@modules/users/user.service';
import { statusTransition } from './ticket.utils';

const ticketRepository = new TicketRepository();
const userService = new UserService();

export class TicketService {
  createTicket = async (_ticket: TicketRequest) => {
    const { createdById, assignedToId, project } = _ticket;

    // Fetch both users
    const [createdBy, assignedTo] = await Promise.all([
      userService.findUserById(createdById),
      userService.findUserById(assignedToId),
    ]);

    // Validate project and role constraints
    if (!createdBy || !assignedTo) {
      throw new NotFoundException('One or both users not found');
    }
    if (createdBy.project !== assignedTo.project) {
      throw new BadRequestException('Users are not in the same project');
    }
    if (createdBy.project !== project) {
      throw new BadRequestException(
        'User creating the ticket is not in the same project',
      );
    }
    if (createdBy.role === 'ADMIN' || assignedTo.role === 'ADMIN') {
      throw new BadRequestException(
        'User is not allowed to create ticket for admins',
      );
    }

    // Create the ticket
    return await ticketRepository.createTicket(_ticket);
  };
  getTicketById = async (id: string) => {
    return await ticketRepository.getTicketById(id);
  };

  getTickets = async (
    role: Role,
    id: string,
    queryParams: ITicketQueryParams,
    limit: number,
    offset: number,
  ) => {
    const techLead = await userService.findUserById(id);
    if (!techLead) {
      throw new NotFoundException(`Account with id: ${id} not found`);
    }
    // If the user is a tech lead
    if (role === 'TECH_LEAD') {
      const project = techLead.project;
      if (queryParams.project && queryParams.project !== project) {
        throw new BadRequestException('User is not authorized to access');
      }
      if (!queryParams.status || !queryParams.project) {
        queryParams.project = project;
      }
    }
    return await ticketRepository.getTickets(queryParams, limit, offset);
  };

  deleteTicket = async (id: string, userId: string) => {
    await this.getTicketById(id);
    return await ticketRepository.deleteTicket(id, userId);
  };

  updateTicketStatus = async (id: string, status: Status) => {
    const ticket = await this.getTicketById(id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (!statusTransition[ticket.status].includes(status)) {
      throw new BadRequestException('Invalid status transition');
    }

    const updatedStatus = await ticketRepository.updateTicketStatus(id, status);
    return {
      updatedStatus,
      nextStatuses: statusTransition[updatedStatus as Status],
    };
  };

  updateTicket = async (id: string, ticket: TicketUpdateRequest) => {
    const { status, createdById, assignedToId } = ticket;
    const existingTicket = await this.getTicketById(id);
    if (!existingTicket) {
      throw new NotFoundException('Ticket not found');
    }

    // Update ticket status if provided
    let updatedTicketStatus;
    if (status) {
      updatedTicketStatus = await this.updateTicketStatus(id, status);
      if (updatedTicketStatus.nextStatuses.includes(status)) {
        throw new BadRequestException('Invalid status transition');
      }
    }
    // Validate user constraints
    if (createdById || assignedToId) {
      const [createdBy, assignedTo] = await Promise.all([
        createdById
          ? userService.findUserById(createdById as string)
          : Promise.resolve(null),
        assignedToId
          ? userService.findUserById(assignedToId as string)
          : Promise.resolve(null),
      ]);

      if ((createdById && !createdBy) || (assignedToId && !assignedTo)) {
        throw new NotFoundException('One or both users not found');
      }

      if (createdBy && assignedTo && createdBy.project !== assignedTo.project) {
        throw new BadRequestException('Users are not in the same project');
      }

      if (
        (createdBy && createdBy.role === 'ADMIN') ||
        (assignedTo && assignedTo.role === 'ADMIN')
      ) {
        throw new BadRequestException(
          'User is not allowed to create ticket for admins',
        );
      }
    }

    const updatedTicketData = {
      title: ticket.title ?? existingTicket.title,
      workType: ticket.workType ?? existingTicket.workType,
      description: ticket.description ?? existingTicket.description,
      status: updatedTicketStatus?.updatedStatus ?? existingTicket.status,
      priority: ticket.priority ?? existingTicket.priority,
      createdById: ticket.createdById ?? existingTicket.createdById,
      assignedToId: ticket.assignedToId ?? existingTicket.assignedToId,
    };

    return await ticketRepository.updateTicket(
      id,
      updatedTicketData as TicketUpdateRequest,
    );
  };
}
