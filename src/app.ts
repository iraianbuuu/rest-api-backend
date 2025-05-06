import express from 'express';
import authRouter from './modules/auth/auth.routes';
const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

export default app;
