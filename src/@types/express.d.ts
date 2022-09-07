import { User } from './../entity/User';
import { Request } from 'express';

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>
        }
    }
}