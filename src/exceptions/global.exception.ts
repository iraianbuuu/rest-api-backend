import { Response } from 'express';
import { StatusCode } from '../utils/status-code';
export enum ErrorType {
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

export class GlobalException extends Error {
  type: ErrorType;
  statusCode: number;

  constructor(type: ErrorType, statusCode: number, message: string) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static handle(err: GlobalException, res: Response) {
    const { type, message, statusCode } = err;
    res.status(statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      type: type || ErrorType.INTERNAL_SERVER_ERROR,
      message: message || 'Internal Server Error',
    });
  }
}
