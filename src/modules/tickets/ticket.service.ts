import { TicketRequest } from './ticket.model';
import TicketRepository from './ticket.respository';
import {
  BadRequestException,
  NotFoundException,
} from '@exceptions/custom.exception';
import UserService from '@modules/users/user.service';

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
}
