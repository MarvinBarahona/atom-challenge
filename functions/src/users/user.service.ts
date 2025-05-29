import {Firestore} from "firebase-admin/firestore";

import {FirestoreFactory, userCollection} from "@config/firestore";

import {User, UserData} from "./models/user.model";

class UserService {
  db: Firestore;

  constructor() {
    this.db = FirestoreFactory.getInstance();
  }

  async getAllUsers() {
    const userQuerySnapshot = await this.db.collection(userCollection).get();
    const users: User[] = [];
    userQuerySnapshot.forEach(
      (doc)=>{
        users.push({
          id: doc.id,
          email: (doc.data() as UserData).email,
        });
      }
    );

    return users;
  }

  async createUser(user: UserData) {
    const newDoc = await this.db.collection(userCollection).add(user);
    return newDoc.id;
  }
}

export const userService = new UserService();
