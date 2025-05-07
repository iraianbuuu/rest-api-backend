import { Router } from 'express';

const userRouter = Router();

userRouter.get('/users/:id');
userRouter.put('/users/:id');
userRouter.delete('/users/:id');

export default userRouter;
