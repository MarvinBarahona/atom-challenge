import { Firestore } from 'firebase-admin/firestore';

import { FirestoreFactory, userCollection } from '../config/firestore';

import { CreateUserRequest, User, UserData } from './models';

class UserService {
    db: Firestore;

    constructor() {
        this.db = FirestoreFactory.getInstance();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const userQuerySnapshot = await this.db
            .collection(userCollection)
            .where('email', '==', email)
            .limit(1)
            .get();

        if (userQuerySnapshot.size === 0) {
            return Promise.resolve(null);
        }

        const doc = userQuerySnapshot.docs[0];
        return {
            id: doc.id,
            email: (doc.data() as UserData).email,
        };
    }

    async getUserById(id: string): Promise<User | null> {
        const userDocSnapshot = await this.db
            .collection(userCollection)
            .doc(id)
            .get();

        if (!userDocSnapshot.exists) {
            return Promise.resolve(null);
        }

        return {
            id: userDocSnapshot.id,
            email: (userDocSnapshot.data() as UserData).email,
        };
    }

    async createUser(user: CreateUserRequest) {
        const newDoc = await this.db.collection(userCollection).add(user);
        return newDoc.id;
    }
}

export const userService = new UserService();
