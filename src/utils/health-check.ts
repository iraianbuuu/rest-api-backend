import { Response  } from "express"
import { StatusCode } from "./status-code"
export const healthCheck = (res : Response) => {
    try{
        const health = {
            uptime : process.uptime(),
            message : 'OK',
            timestamp : Date.now()
        }
        res.status(StatusCode.OK).send(health);
    }
    catch(error){
        res.status(StatusCode.SERVICE_UNAVAILABLE).send({
            "message" : "The Ziraa server is not available.Please try again some time!!!"
        })
    }
}