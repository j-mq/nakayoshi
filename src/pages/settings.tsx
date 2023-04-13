import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import { getUserData, updateOrCreateUser } from '@/firebase/collections/users';
import firebaseApp from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const UserSettings = () => {
  const router = useRouter();
  const [user] = useAuthState(auth as any);
  const [avatarURL, setAvatarURL] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  //Check if user is logged in else redirect to index
  useEffect(() => {
    const checkUserRegistration = async () => {
      if (auth.currentUser) {
        const registeredUser = await getUserData(auth.currentUser.uid);

        if (!registeredUser) {
          const { uid, photoURL, displayName } = auth.currentUser as any;
          console.log('the user data', uid, photoURL, displayName);
          setAvatarURL(photoURL);
          setNickname(displayName);
          setUserId(uid);
        } else {
          const { uid, avatarUrl, nickname } = registeredUser;
          console.log('the registered user data', uid, avatarUrl, nickname);
          setAvatarURL(avatarUrl);
          setNickname(nickname);
          setUserId(uid);
        }
      } else {
        router.push('/');
      }
    };
    checkUserRegistration();
  }, [router]);

  const updateAvatarURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarURL(reader.result as string);
      };
    }
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const updateUser = async () => {
    await updateOrCreateUser(userId, avatarURL, nickname);
    router.push('/');
  };

  return (
    <>
      <div>
        <label htmlFor='avatar'>Avatar</label>
        <img src={avatarURL} alt={`user-${userId}`}></img>
        <input
          id='avatar'
          type='file'
          accept='image/png, image/jpeg'
          onChange={updateAvatarURL}
        />
      </div>
      <div>
        <label htmlFor='nickname'>Nickname</label>
        <input
          id='nickname'
          type='text'
          value={nickname}
          onChange={changeNickname}
        />
      </div>
      <button onClick={updateUser}>Update</button>
    </>
  );
};

export default UserSettings;
