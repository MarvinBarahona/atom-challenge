import { User } from './user.model';

export interface ToDoItem {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    createdAt: Date;
}

export type ToDoUpsertRequest = Omit<ToDoItem, 'id' | 'createdAt'>;

export interface ToDoListResponse {
    user: User;
    items: ToDoItem[];
}
