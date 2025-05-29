import {initializeApp} from "firebase-admin/app";
import {Firestore, getFirestore} from "firebase-admin/firestore";

export class FirestoreFactory {
  private static db: Firestore;

  public static getInstance(): Firestore {
    if (!FirestoreFactory.db) {
      initializeApp();
      FirestoreFactory.db = getFirestore();
    }

    return FirestoreFactory.db;
  }
}
