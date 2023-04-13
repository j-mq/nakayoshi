import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import { useRouter } from 'next/router';

type LogoutProps = {
  signOut: () => void;
};

const Logout = ({ signOut }: LogoutProps) => {
  return (
    <button className='sign-out' onClick={signOut}>
      Sign Out
    </button>
  );
};

export default Logout;
