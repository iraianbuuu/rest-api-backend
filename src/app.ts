import express from 'express';
import authRouter from './modules/auth/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';
import userRouter from './modules/users/user.routes';
import logMiddleware from './middleware/log.middleware';
import { swagger } from './config/swagger';
import swaggerDocumentation from './config/swagger';

const app = express();

app.use(express.json());
app.use(logMiddleware);
app.use('/api/v1/api-docs', swagger.serve, swagger.setup(swaggerDocumentation));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use(errorMiddleware);

export default app;
