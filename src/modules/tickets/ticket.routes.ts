import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';

const ticketRouter = Router();
ticketRouter.use(authMiddleware);

ticketRouter.get('/tickets', roleMiddleware);
ticketRouter.get('/tickets/:id');
ticketRouter.post('/tickets');
ticketRouter.put('/tickets/:id');
ticketRouter.patch('/tickets/:id/status');
ticketRouter.delete('/tickets/:id');

export default ticketRouter;
