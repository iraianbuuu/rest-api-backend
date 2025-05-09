import express from 'express';
import authRouter from './modules/auth/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';
import userRouter from './modules/users/user.routes';
const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

export default app;
