import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import { useRouter } from 'next/router';

type UserSettingsProps = {
  auth: any;
};

const UserSettings = ({ auth }: UserSettingsProps) => {
  return (
    <>
      <div>
        <input type='file' accept='image/png, image/jpeg' />
      </div>
      <div>
        <input type='text' />
      </div>
    </>
  );
};

export default UserSettings;
