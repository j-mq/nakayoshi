import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp, { db } from '@/firebase/config';
import ChatRoom from '../components/ChatRoom';
import Login from '../components/Login';
import Logout from '@/components/Logout';
import { getUserData } from '@/firebase/collections/users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const auth = getAuth(firebaseApp);

const App = () => {
  const [user, loading, error] = useAuthState(auth as any);
  const router = useRouter();

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (user?.uid) {
        const registeredUser = await getUserData(user.uid);
        if (!registeredUser) {
          router.push('/settings');
        }
      }
    };
    checkUserRegistration();
  }, [user, router]);

  const goToSettings = () => {
    router.push('/settings');
  };

  return (
    <div className='App'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <header>
            <h1>⚛️🔥💬</h1>
            <button onClick={goToSettings}>Settings</button>
            <Logout auth={auth} />
          </header>
          <section>{user ? <ChatRoom auth={auth} /> : <Login />}</section>
        </>
      )}
    </div>
  );
};

export default App;
