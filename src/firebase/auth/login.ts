import firebaseApp from '../config';
import firebase from 'firebase/compat/app';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  return user;
};

export const signOutFromGoogle = async () => {
  await auth.signOut();
};
