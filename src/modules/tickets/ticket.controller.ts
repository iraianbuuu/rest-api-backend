import { Request, Response , NextFunction } from 'express';
import { TicketRequest } from './ticket.model';
import { TicketService } from './ticket.service';
const ticketService = new TicketService();
const { createTicket } = ticketService;
class TicketController {
    createTicket = async (req: Request<TicketRequest>, res: Response, next: NextFunction) => {
        try {
                const ticket = req.body;
                await createTicket(ticket);
        } catch (error) {
            next(error);
        }
    }
}