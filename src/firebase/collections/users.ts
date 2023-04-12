import { db } from '../config';
import { getDoc, doc } from 'firebase/firestore';

export const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, 'users', uid));
  return user;
};
