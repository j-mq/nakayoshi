import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import { useRouter } from 'next/router';

type LogoutProps = {
  auth: any;
};

const Logout = ({ auth }: LogoutProps) => {
  const signOut = async () => {
    await signOutFromGoogle();
  };

  return (
    auth.currentUser && (
      <button className='sign-out' onClick={() => signOut()}>
        Sign Out
      </button>
    )
  );
};

export default Logout;
