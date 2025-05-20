import { Request, Response, NextFunction } from 'express';
import { CommentRequest } from './comment.model';
import CommentService from './comment.service';
import { StatusCode } from '@utils/status-code';
const commentService = new CommentService();
const {
    addComment,
    deleteComment,
    getAllComments,
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

    getAllComments = async (req: Request, res: Response, next: NextFunction) => {}
 }

export default CommentController;