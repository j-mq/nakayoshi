import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp, { db } from '@/firebase/config';
import ChatRoom from '../components/ChatRoom';
import { getUserData } from '@/firebase/collections/users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import styled from 'styled-components';
import ActionButton from '@/components/ActionButton';
import Loading from '@/components/Loading';

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
  background: white;
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

const auth = getAuth(firebaseApp);
const App = () => {
  const [firstLoading, setFirstLoading] = useState(true);

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

  //Loading screen if no user is logged in
  useEffect(() => {
    if (firstLoading && !loading) {
      setFirstLoading(false);
    }
  }, [loading, firstLoading]);

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
      {loading || firstLoading ? (
        <Loading />
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
              <Logo />
              <Title>Nakayoshi</Title>
              <ActionButton onClick={signIn}>Login</ActionButton>
            </IntroContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
