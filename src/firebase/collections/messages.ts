import { db } from '../config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const messagesCollection = collection(db, 'messages');

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
