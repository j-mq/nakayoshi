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
import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import styled from 'styled-components';
import ActionButton from '@/components/ActionButton';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  justify-items: flex-start;
  align-items: center;
  padding: 16px;
  background: ${(props) => props.theme.background};
  overflow: hidden;
`;

const Logo = styled.div`
  background: white;
  position: relative;
  width: 33%;
  padding-bottom: 33%;
  background: white;
  border-radius: 50%;

  //mobile
  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 100%;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: ${(props) => props.theme.primaryLighter};
  margin: 0;
  margin-top: 16px;
  font-family: ${(props) => props.theme.secondaryFont};
  font-size: 48px;
  margin: 16px 0px;
`;

const auth = getAuth(firebaseApp);
const App = () => {
  const [user, loading, error] = useAuthState(auth as any);
  const router = useRouter();

  const [registeredUser, setRegisteredUser] = useState<any>(undefined);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (user?.uid) {
        const registeredUser = await getUserData(user.uid);
        if (!registeredUser) {
          router.push('/settings');
        } else {
          setRegisteredUser(registeredUser);
        }
      }
    };
    checkUserRegistration();
  }, [user, router]);

  const goToSettings = () => {
    router.push('/settings');
  };

  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOut = async () => {
    await signOutFromGoogle();
    setRegisteredUser(undefined);
  };

  return (
    <Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {registeredUser ? (
            <>
              <header>
                <h1>⚛️🔥💬</h1>
                {registeredUser && (
                  <>
                    <button onClick={goToSettings}>Settings</button>
                    <Logout signOut={signOut} />
                  </>
                )}
              </header>

              <ChatRoom registeredUser={registeredUser} />
            </>
          ) : (
            <>
              <Logo />
              <Title>Nakayoshi</Title>
              <ActionButton onClick={signIn}>Login</ActionButton>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
