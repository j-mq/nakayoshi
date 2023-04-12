import { signInWithGoogle } from '@/firebase/auth/login';

type SignInProps = {};

const SignIn = () => {
  const signIn = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      <button className='sign-in' onClick={signIn}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
};

export default SignIn;
