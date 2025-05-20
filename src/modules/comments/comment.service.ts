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
const { addComment , getCommentById,  deleteComment } = commentRepository;

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

    deleteComment = async (ticketId : string , commentId : string , authorId : string) => {

        // Check ticket , comment and user exists
        const [ticket , author , comment] = await Promise.all([
            getTicketById(ticketId),
            findUserById(authorId),
            getCommentById(commentId),
        ])

        if(!ticket) throw new NotFoundException('Ticket not found');
        if(!author) throw new NotFoundException('Author not found');
        if(!comment) throw new NotFoundException('Comment not found');

        return await deleteComment(commentId , authorId);
    }

    getAllComments = async () => {}
    
    getCommentById = async (commentId : string) => {
        return await getCommentById(commentId);
    }
}

export default CommentService;