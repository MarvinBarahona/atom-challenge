import {Firestore} from "firebase-admin/firestore";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

import {FirestoreFactory, toDoCollection, userCollection} from "../config/firestore";

import {ToDoItem, ToDoItemData, ToDoUpsertRequest} from "./models";

class ToDoService {
  db: Firestore;

  constructor() {
    this.db = FirestoreFactory.getInstance();
  }

  async getToDoList(userId: string): Promise<ToDoItem[] | null> {
    const toDoQuerySnapshot = await this.db
      .collection(userCollection)
      .doc(userId)
      .collection(toDoCollection)
      .get();

    const toDoList: ToDoItem[] = [];
    toDoQuerySnapshot.forEach((doc) => {
      const toDoData = doc.data() as ToDoItemData;
      toDoList.push({
        id: doc.id,
        title: toDoData.title,
        description: toDoData.description,
        isDone: toDoData.isDone,
        createdAt: (toDoData.createdAt as Timestamp).toDate(),
      });
    });

    return toDoList;
  }

  async createItem(userId: string, toDoData: ToDoUpsertRequest): Promise<ToDoItem> {
    const docData: ToDoItemData = {
      ...toDoData,
      createdAt: new Date(),
    };

    const newDoc = await this.db
      .collection(userCollection)
      .doc(userId)
      .collection(toDoCollection)
      .add(docData);

    return {
      ...docData,
      id: newDoc.id,
      createdAt: docData.createdAt as Date,
    };
  }

  async updateItem(userId: string, itemId: string, toDoData: ToDoUpsertRequest): Promise<boolean> {
    await this.db
      .collection(userCollection)
      .doc(userId)
      .collection(toDoCollection)
      .doc(itemId)
      .update(toDoData);
    return true;
  }

  async deleteItem(userId: string, itemId: string): Promise<boolean> {
    await this.db
      .collection(userCollection)
      .doc(userId)
      .collection(toDoCollection)
      .doc(itemId)
      .delete();
    return true;
  }
}

export const toDoService = new ToDoService();
