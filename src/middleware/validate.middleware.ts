import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCode } from '../utils/status-code';
export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).json({
        error: {
          message: (error as ZodError).errors
            .map((err) => err.message)
            .join(', '),
        },
      });
    }
  };
