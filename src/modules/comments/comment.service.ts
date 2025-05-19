import { TicketService } from "@modules/tickets/ticket.service";
import UserService from "@modules/users/user.service";
import { CommentRequest } from "./comment.model";
import { NotFoundException } from "@exceptions/custom.exception";
import CommentRepository from "./comment.repository";
const ticketService = new TicketService();
const userService = new UserService();
const commentRepository = new CommentRepository();
const { getTicketById } = ticketService;
const { findUserById } = userService;
const { addComment } = commentRepository;

class CommentService {
    addComment = async (ticketId: string, _comment : CommentRequest, authorId: string) => {
        const { comment } = _comment;
        const [ticket, author] = await Promise.all([
            getTicketById(ticketId),
            findUserById(authorId),
        ]);
        
        if(!ticket) {
            throw new NotFoundException('Ticket not found');
        }
        if(!author) {
            throw new NotFoundException('Author not found');
        }
        return await addComment(ticketId, comment, authorId);
    }

    deleteComment = async () => {}

    getAllComments = async () => {}
}

export default CommentService;