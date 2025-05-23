import { Request, Response } from "express"
import { StatusCode } from "./status-code"
import { Router } from "express"
const healthCheckRouter = Router();

export const healthCheck = (_req: Request, res: Response) => {
    try {
        const health = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        }
        res.status(StatusCode.OK).send(health);
    }
    catch (error) {
        res.status(StatusCode.SERVICE_UNAVAILABLE).send({
            "message": "The Ziraa server is not available.Please try again some time!!!"
        })
    }
}
healthCheckRouter.get('/', healthCheck);

export default healthCheckRouter;
