import { User } from '../../users/models';
import { ToDoItem } from './to-do.model';

export type ToDoListResponse = {
    user: User;
    items: ToDoItem[];
};

export type ToDoCreateResponse = ToDoItem;
