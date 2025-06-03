import { firestore } from 'firebase-admin';
import Timestamp = firestore.Timestamp;

export interface ToDoItemData {
    title: string;
    description: string;
    isDone: boolean;
    createdAt: Timestamp | Date;
}

export interface ToDoItem extends ToDoItemData {
    id: string;
    createdAt: Date;
}
