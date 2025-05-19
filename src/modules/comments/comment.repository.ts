import prisma from "@config/prisma";

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
    deleteComment = async () => {}

    getAllComments = async () => {}
}

export default CommentRepository;
