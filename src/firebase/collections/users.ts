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
import { storage } from '../config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  nickname: string,
  oldAvatarUrl?: string,
  newAvatar?: File
) => {
  const user = await getDocs(query(usersCollection, where('uid', '==', uid)));

  let avatarUrl = oldAvatarUrl;

  if (newAvatar) {
    avatarUrl = await uploadAvatar(newAvatar);
  }

  if (user.docs[0] && user.docs[0].data()) {
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

export const uploadAvatar = async (file: File) => {
  const storageRef = ref(storage, `avatars/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

export const updateLoggedInStatus = async (uid: string, status: boolean) => {
  const user = await getDocs(query(usersCollection, where('uid', '==', uid)));
  if (user.docs[0] && user.docs[0].data()) {
    await updateDoc(doc(usersCollection, user.docs[0].id), {
      loggedIn: status,
    });
  }
};

export const listenForLoggedInStatus = async () => {
  const users = await getDocs(usersCollection);
  users.forEach((user) => {
    const userData = user.data();
    if (userData.loggedIn) {
      updateLoggedInStatus(userData.uid, false);
    }
  });
};
