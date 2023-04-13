import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import { updateOrCreateUser } from '@/firebase/collections/users';
import { useRouter } from 'next/router';
import { useState } from 'react';

type UserSettingsProps = {
  auth: any;
  isAlreadyRegistered?: boolean;
};

const UserSettings = ({ auth, isAlreadyRegistered }: UserSettingsProps) => {
  const { uid, photoURL, displayName } = auth.currentUser as any;

  console.log('the currentUser', auth.currentUser);

  const [avatarURL, setAvatarURL] = useState(photoURL);
  const [nickname, setNickname] = useState(displayName);

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
    await updateOrCreateUser(uid, avatarURL, nickname);
  };

  return (
    <>
      <div>
        <label htmlFor='avatar'>Avatar</label>
        <img src={avatarURL} alt={`user-${uid}`}></img>
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
      <button onClick={updateUser}>
        {isAlreadyRegistered ? 'Update' : 'Register'}
      </button>
    </>
  );
};

export default UserSettings;
