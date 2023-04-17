import { getUserData, updateOrCreateUser } from '@/firebase/collections/users';
import firebaseApp from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ActionButton from '@/components/ActionButton';
import IconButton from '@/components/IconButton';
import { signOutFromGoogle } from '@/firebase/auth/login';
import Head from 'next/head';

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  justify-items: center;
  align-items: center;

  background: ${(props) => props.theme.background};
  overflow-y: auto;
`;

const Content = styled.div`
  padding: 16px;
  padding-top: 20vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
`;

const FileInput = styled.input`
  display: none;
`;

const IconButtonPositioner = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const NicknameInput = styled.input`
  width: 150px;
  padding: 4px;
  height: 50px;
  background: ${(props) => props.theme.primaryDarker};
  border: none;
  border-radius: 8px;
  font-size: 32px;
  font-family: ${(props) => props.theme.secondaryFont};
  color: ${(props) => props.theme.primaryLighter};
  outline: none;
  text-align: center;
  margin: 16px 0px 32px 0px;

  :focus {
    background: ${(props) => props.theme.primaryDark};
  }
`;

const auth = getAuth(firebaseApp);

const UserSettings = () => {
  const router = useRouter();
  const [avatarURL, setAvatarURL] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (auth.currentUser) {
        const registeredUser = await getUserData(auth.currentUser.uid);

        if (!registeredUser) {
          const { uid, photoURL, displayName } = auth.currentUser as any;
          setAvatarURL(photoURL);
          setNickname(displayName);
          setUserId(uid);
        } else {
          const { uid, avatarUrl, nickname } = registeredUser;
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

  const uploadAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateAvatarURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarURL(reader.result as string);
      };
      setCurrentFile(file);
    }
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const updateUser = async () => {
    await updateOrCreateUser(userId, nickname, avatarURL, currentFile);
    router.push('/');
  };

  const signOut = async () => {
    await signOutFromGoogle();
    router.push('/');
  };

  const cancelUpdate = async () => {
    if (auth.currentUser) {
      const registeredUser = await getUserData(auth.currentUser.uid);
      if (registeredUser) {
        router.push('/');
      } else {
        signOut();
      }
    }
  };

  const isUpdateButtonDisabled = () => {
    if (nickname.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Head>
        <title>Nakayoshi Settings</title>
        <meta name='description' content='Chat with your friends and family' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Content>
          <AvatarContainer>
            <Avatar src={avatarURL} alt={`user-${userId}`}></Avatar>
            <FileInput
              id='avatar'
              type='file'
              accept='image/png, image/jpeg'
              onChange={updateAvatarURL}
              ref={fileInputRef}
            />
            <IconButtonPositioner>
              <IconButton onClick={uploadAvatar}>
                add_photo_alternate
              </IconButton>
            </IconButtonPositioner>
          </AvatarContainer>
          <NicknameInput
            id='nickname'
            type='text'
            value={nickname}
            onChange={changeNickname}
            maxLength={30}
          />
          <ActionButton
            onClick={updateUser}
            disabled={isUpdateButtonDisabled()}
          >
            Update
          </ActionButton>
          <ActionButton onClick={cancelUpdate}>Cancel</ActionButton>
        </Content>
      </Container>
    </>
  );
};

export default UserSettings;
