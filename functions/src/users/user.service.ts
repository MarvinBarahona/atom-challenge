import {Firestore} from "firebase-admin/firestore";

import {FirestoreFactory, userCollection} from "../config/firestore";

import {User, UserData} from "./models";

class UserService {
  db: Firestore;

  constructor() {
    this.db = FirestoreFactory.getInstance();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userQuerySnapshot = await this.db.collection(userCollection).where('email', '==', email).limit(1).get();

    if (userQuerySnapshot.size === 0) {
      return Promise.resolve(null);
    }

    const doc = userQuerySnapshot.docs[0];
    return {
      id: doc.id,
      email: (doc.data() as UserData).email,
    };
  }

  async createUser(user: UserData) {
    const newDoc = await this.db.collection(userCollection).add(user);
    return newDoc.id;
  }
}

export const userService = new UserService();
