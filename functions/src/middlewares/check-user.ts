import { NextFunction } from 'express';

import { userService } from '../users/user.service';
import {
    AuthRequest,
    ErrorResponse,
    TypedRequest,
    TypedResponse,
} from '../types';

export const checkUserAuth =
    () =>
    async (
        req: TypedRequest,
        res: TypedResponse,
        next: NextFunction
    ): Promise<void> => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const response: ErrorResponse = {
                success: false,
                error: 'Unauthorized: No token provided',
            };
            res.status(401).json(response);
            return;
        }

        try {
            const user = await userService.getUserById(authHeader);

            if (!user) {
                const response: ErrorResponse = {
                    success: false,
                    error: 'Invalid or expired token',
                };
                res.status(401).json(response);
                return;
            } else {
                (req as AuthRequest).user = user;
                next();
            }
        } catch (err) {
            const response: ErrorResponse = {
                success: false,
                error:
                    (err as { message?: string }).message ??
                    'Invalid or expired token',
            };
            res.status(401).json(response);
            return;
        }
    };
