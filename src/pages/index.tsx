import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp, { db } from '@/firebase/config';
import ChatRoom from '../components/ChatRoom';
import { getUserData } from '@/firebase/collections/users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import styled from 'styled-components';
import ActionButton from '@/components/ActionButton';
import JumpingRabbit from '@/components/JumpingRabbit';
import Head from 'next/head';
import ErrorMessage from '@/components/ErrorMessage';

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  justify-items: flex-start;
  align-items: center;
  background: ${(props) => props.theme.background};
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
`;

const Logo = styled.div`
  background: white;
  position: relative;
  width: 33%;
  padding-bottom: 33%;
  background: ${(props) => props.theme.primaryLighter};
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 100%;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: ${(props) => props.theme.primaryLighter};
  margin: 0;
  font-family: ${(props) => props.theme.secondaryFont};
  font-size: 48px;
  margin: 16px 0px;
`;

const auth: Auth = getAuth(firebaseApp);

const App = () => {
  const router = useRouter();

  const [registeredUserLoading, setRegisteredUserLoading] =
    useState<boolean>(true);
  const [registeredUser, setRegisteredUser] = useState<any>(undefined);
  const [user, userLoading, error] = useAuthState(auth);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (user?.uid) {
        const registeredUser = await getUserData(user.uid);
        if (!registeredUser) {
          router.push('/settings');
        } else {
          setRegisteredUser(registeredUser);
          setRegisteredUserLoading(false);
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
    <>
      <Head>
        <title>Nakayoshi</title>
        <meta name='description' content='Chat with your friends and family' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        {userLoading || registeredUserLoading ? (
          <JumpingRabbit type='loading' />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <>
            {registeredUser ? (
              <ChatRoom
                registeredUser={registeredUser}
                goToSettings={goToSettings}
                signOut={signOut}
              />
            ) : (
              <IntroContainer>
                <Logo>
                  <JumpingRabbit type='title' />
                </Logo>
                <Title>Nakayoshi</Title>
                <ActionButton onClick={signIn}>Login</ActionButton>
              </IntroContainer>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default App;
