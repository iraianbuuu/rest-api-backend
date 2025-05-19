import { UserPayload } from './user.model';

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export {};
