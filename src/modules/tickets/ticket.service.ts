import prisma from "../../config/prisma";
import { TicketRequest } from "./ticket.model";

export class TicketService {
    createTicket = async (_ticket: TicketRequest) => {
        const { title, workType, description, project, assigneeId, createdBy }  = _ticket;
        const createdTicket = await prisma.ticket.create({
            data: {
                title,   
                workType,
                description,
                project,
                assignedToId: assigneeId,
                createdById: createdBy,
            }
        });
        return createdTicket;
    }
}