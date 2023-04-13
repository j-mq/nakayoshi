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

export const getUsers = async (uids: string[]) => {
  const CHUNK_SIZE = 10;

  // Split the array into chunks of 10 because Firebase has a limit of 10
  const chunks = [];
  for (let i = 0; i < uids.length; i += CHUNK_SIZE) {
    const chunk = uids.slice(i, i + CHUNK_SIZE);
    chunks.push(chunk);
  }

  const promises = chunks.map(async (chunk) => {
    const users = await getDocs(
      query(usersCollection, where('uid', 'in', chunk))
    );
    if (users.empty) {
      return [];
    } else {
      const usersData = users.docs.map((user) => user.data());
      return usersData;
    }
  });

  const results = await Promise.all(promises);

  return results.flat();
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

export const uploadAvatar = async (file: File) => {
  const storageRef = ref(storage, `avatars/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};
