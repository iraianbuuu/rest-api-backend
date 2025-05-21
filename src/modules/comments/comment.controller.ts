import { Request, Response, NextFunction } from 'express';
import { CommentRequest, ICommentQueryParams } from './comment.model';
import CommentService from './comment.service';
import { StatusCode } from '@utils/status-code';
import { getPaginationationParameters } from '@utils/index';
import { NotFoundException } from '@exceptions/custom.exception';
const commentService = new CommentService();
const {
    addComment,
    deleteComment,
    getAllCommentsByTicketId
} = commentService;

class CommentController {
    addComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const {id: authorId} = req.user;
            const comment = req.body as CommentRequest;
            const newComment = await addComment(id,comment, authorId);
            res.status(StatusCode.CREATED).json({
                message: 'Comment added successfully',
                data: newComment,
            });
        } catch (error) {
            next(error);
        }
    }

    deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {id , commentId} = req.params;
            const {id : userId} = req.user;
            await deleteComment(id , commentId , userId);
            res.status(StatusCode.OK).json({
                messsage : 'Comment deleted successfully',
            })
        }
        catch(error){
            next(error)
        }
    }

    getAllCommentsByTicketId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id : ticketId} = req.params;
            const commentQueryParams = req.query as ICommentQueryParams;
            const { page, perPage, limit, offset } = getPaginationationParameters(
            commentQueryParams.page as string,
            commentQueryParams.perPage as string,
        );

        const comments = await getAllCommentsByTicketId(limit, offset, ticketId);
        if(!comments) throw new NotFoundException('No comments found');

        res.status(StatusCode.OK).json({
            message : 'Comments fetched successfully',
            data : comments,
            page,
            perPage,
            total_pages : Math.ceil(comments.totalComments / limit),
            total_comments : comments.totalComments,
        })
        } catch (error) {
            next(error);
        }
    }
 }

export default CommentController;