import { db } from '../config';
import { getDoc, doc, collection, addDoc, updateDoc } from 'firebase/firestore';

const usersCollection = collection(db, 'users');

export const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, 'users', uid));
  return user;
};

export const updateOrCreateUser = async (
  uid: string,
  avatarUrl: string,
  nickname: string
) => {
  //Check if user already exists
  const user = await getUser(uid);
  if (user.exists()) {
    //Update user
    await updateDoc(doc(usersCollection, uid), {
      avatarUrl,
      nickname,
    });
  }
  //Create user
  else {
    await addDoc(usersCollection, {
      uid,
      avatarUrl,
      nickname,
    });
  }
};
