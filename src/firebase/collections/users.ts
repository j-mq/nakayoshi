import { db } from '../config';
import {
  getDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const usersCollection = collection(db, 'users');

export const getUserData = async (uid: string) => {
  const user = await getDocs(query(usersCollection, where('uid', '==', uid)));

  if (user.empty) {
    return undefined;
  } else {
    const userData = user.docs[0].data();
    return userData;
  }
};

export const updateOrCreateUser = async (
  uid: string,
  avatarUrl: string,
  nickname: string
) => {
  const user = await getDocs(query(usersCollection, where('uid', '==', uid)));

  if (user.docs[0].data()) {
    await updateDoc(doc(usersCollection, user.docs[0].id), {
      avatarUrl,
      nickname,
    });
  } else {
    await addDoc(usersCollection, {
      uid,
      avatarUrl,
      nickname,
    });
  }
};
