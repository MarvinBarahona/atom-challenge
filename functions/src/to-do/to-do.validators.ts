import { z, ZodType } from 'zod';
import { ToDoUpsertRequest } from './models';

export const upsertToDoListItemSchema: ZodType<ToDoUpsertRequest> = z.object({
    title: z.string().max(100),
    description: z.string().max(200),
    isDone: z.boolean(),
});
