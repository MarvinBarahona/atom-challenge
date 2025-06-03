import { ToDoItemData } from './to-do.model';

export type ToDoItemParam = { itemId: string };
export type ToDoUpsertRequest = Omit<ToDoItemData, 'createdAt'>;
