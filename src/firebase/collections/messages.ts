import { db } from '../config';
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

const messagesCollection = collection(db, 'messages');

export type Message = {
  text: string;
  createdAt: Timestamp;
  uid: string;
  photoURL: string;
};

export const addMessage = async (
  text: string,
  uid: string,
  photoURL: string
) => {
  await addDoc(messagesCollection, {
    text,
    createdAt: serverTimestamp(),
    uid,
    photoURL,
  });
};
