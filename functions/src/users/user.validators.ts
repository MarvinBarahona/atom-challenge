import { z, ZodType } from 'zod';
import { CheckUserRequest, CreateUserRequest } from './models';

export const checkUserQuerySchema: ZodType<CheckUserRequest> = z.object({
    email: z.string().email(),
});

export const createUserBodySchema: ZodType<CreateUserRequest> = z.object({
    email: z.string().email(),
});
