import prisma from '../../config/prisma';
import { TicketRequest } from './ticket.model';
import { handleError } from '../../utils';
import { NotFoundException } from '../../exceptions/custom.exception';
class TicketRepository {
  createTicket = async (_ticket: TicketRequest) => {
    try {
      const {
        title,
        workType,
        description,
        project,
        assignedToId,
        createdById,
      } = _ticket;
      const createdTicket = await prisma.ticket.create({
        data: {
          title,
          workType,
          description,
          project,
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
        where: { id },
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
}

export default TicketRepository;
