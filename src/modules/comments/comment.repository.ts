import prisma from "@config/prisma";
import { NotFoundException } from "@exceptions/custom.exception";
import { handleError } from "@utils/index";

class CommentRepository {
    addComment = async (ticketId: string, comment: string, authorId: string) => {
        return await prisma.comment.create({
            data: {
                comment,
                ticketId,
                authorId,
            },
        });
    }
    deleteComment = async (commentId : string , userId : string) => {
        try {
            const deletedComment = await prisma.comment.update({
                where : {id : commentId},
                data : {isDeleted : true , deletedById : userId }
            })
            return deletedComment;
        } catch (error) {
            handleError(error);
        }
    }

    getAllCommentsByTicketId = async (limit : number, offset : number , ticketId: string) => {
        try {
            const comments = await prisma.comment.findMany({
                where : {
                    isDeleted : false,
                    ticketId : ticketId
                },
               skip : offset,
               take : limit
            });

            const totalComments = await prisma.comment.count({
                where : {
                    isDeleted : false,
                    ticketId : ticketId
                }
            });
            return {comments , totalComments};
        } catch (error) {
            handleError(error);
        }
    }

    getCommentById = async (commentId : string) => {
        try{
            const comment = await prisma.comment.findUnique({
                where : {
                    id : commentId ,
                    isDeleted : false
                }
            })
            if(!comment) throw new NotFoundException('Comment not found');
            return comment;
        }
        catch(error){
            handleError(error);
        }
    }
}

export default CommentRepository;
