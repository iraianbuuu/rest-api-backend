import { Router } from 'express';
import CommentController from './comment.controller';

const commentRouter = Router();

const commentController = new CommentController();

const {
  deleteComment,
} = commentController;

commentRouter.delete('/:id', deleteComment);

export default commentRouter;