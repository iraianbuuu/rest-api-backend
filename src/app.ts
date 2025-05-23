import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from '@modules/auth/auth.routes';
import { errorMiddleware } from '@middleware/error.middleware';
import userRouter from '@modules/users/user.routes';
import logMiddleware from '@middleware/log.middleware';
import { swagger } from '@config/swagger';
import swaggerDocumentation from '@config/swagger';
import ticketRouter from '@modules/tickets/ticket.routes';
import { getMetrics } from '@utils/metrics';
import {
  METRICS_URL,
  AUTH_URL,
  USERS_URL,
  TICKETS_URL,
  DOCS_URL,
  HEALTH_CHECK_URL,
} from '@utils/api';
import { metricsMiddleware } from '@middleware/metrics.middleware';
import rateLimiter from '@middleware/rate-limit.middleware';
import healthCheckRouter from '@utils/health-check';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
app.use(metricsMiddleware);
app.use(logMiddleware);
app.use(METRICS_URL, getMetrics);
app.use(HEALTH_CHECK_URL,healthCheckRouter);
app.use(DOCS_URL, swagger.serve, swagger.setup(swaggerDocumentation));
app.use(AUTH_URL, authRouter);
app.use(USERS_URL, userRouter);
app.use(TICKETS_URL, ticketRouter);
app.use(errorMiddleware);

export default app;
