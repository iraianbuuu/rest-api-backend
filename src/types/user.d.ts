import { UserPayload } from '../modules/users/user.model';

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export {};
