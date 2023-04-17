import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import { db } from '@/firebase/config';
import { Message, addMessage } from '@/firebase/collections/messages';
import ChatMessage from '@/components/ChatMessage';
import styled from 'styled-components';
import IconButton from './IconButton';
import EmojiButton from './EmojiButton';
import { EmojiClickData } from 'emoji-picker-react';
import { RegisteredUser } from '@/firebase/collections/users';
import UserStatus from './UserStatus';

const ChatRoomContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'options options'
    'users messages'
    'input input';
  height: 100%;
  width: 100%;
`;

const OptionsArea = styled.div`
  grid-area: options;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  width: 100%;
  height: fit-content;
  background: ${(props) => props.theme.primaryLight};
  padding: 24px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  z-index: 3;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const UsersArea = styled.div`
  grid-area: users;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 16px;
  gap: 16px;
  background: ${(props) => props.theme.secondaryTransparencyGradient};

  @media (max-width: 768px) {
    width: 62px;
    padding: 8px;
    align-items: center;
  }
`;

const MessagesArea = styled.div`
  grid-area: messages;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 16px;
  gap: 16px;
`;

const InputArea = styled.div`
  grid-area: input;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: fit-content;
  max-height: 170px;
  background: ${(props) => props.theme.primaryLight};
  padding: 24px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  z-index: 3;

  @media (max-width: 768px) {
    padding: 16px;
    max-height: 100px;
  }
`;

const InputForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
  height: fit-content;
  position: relative;
`;

const MessageInput = styled.textarea`
  width: 100%;
  border: none;
  height: fit-content;
  padding: 16px 24px;
  resize: none;
  font-size: 16px;
  color: ${(props) => props.theme.secondaryDarker};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.secondaryDark};
  background: ${(props) => props.theme.secondaryLighter};

  :focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.primaryDark};
    background: ${(props) => props.theme.primaryLighter};
    color: ${(props) => props.theme.primaryDarker};
  }
`;

type ChatRoomProps = {
  registeredUser: RegisteredUser;
  goToSettings: () => void;
  signOut: () => void;
};

const ChatRoom = ({ registeredUser, goToSettings, signOut }: ChatRoomProps) => {
  const [processedMessages, setProcessedMessages] = useState<Message[]>([]);
  const [messageValue, setMessageValue] = useState<string>('');

  const messagesAreaRef = useRef<HTMLDivElement>(null);

  const messagesCollection = collection(db, 'messages');
  const messagesQuery = query(
    messagesCollection,
    orderBy('createdAt', 'desc'),
    limit(25)
  );

  const [messages, loadingMessages] = useCollectionData(messagesQuery, {
    idField: 'id',
  } as any);

  const usersCollection = collection(db, 'users');
  const usersQuery = query(usersCollection, orderBy('nickname', 'asc'));
  const [users, loadingUsers] = useCollectionData(usersQuery, {
    idField: 'id',
  } as any);

  useEffect(() => {
    const getProcessedMessages = async () => {
      if (messages && users) {
        const newMessages = messages.map((msg: any) => {
          const user = users.find((user: any) => user.uid === msg.uid);
          if (user) {
            return {
              ...msg,
              photoURL: user.avatarUrl,
              nickname: user.nickname,
            };
          } else {
            return msg;
          }
        });

        setProcessedMessages(newMessages);
      }
    };
    getProcessedMessages();
  }, [messages, users]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uid, avatarUrl } = registeredUser;
    if (messageValue.length > 0) {
      await addMessage(messageValue, uid, avatarUrl);
    }
    setMessageValue('');
    messagesAreaRef.current?.scrollTo(0, messagesAreaRef.current.scrollHeight);
  };

  const getLastMessageCreatedAtByUser = (uid: string) => {
    if (processedMessages && processedMessages.length > 0) {
      const messagesByUser = processedMessages.filter(
        (msg: any) => msg.uid === uid
      );
      const lastMessage = messagesByUser.sort((a: any, b: any) => {
        return b.createdAt - a.createdAt;
      })[0];
      return lastMessage.createdAt;
    }
    return undefined;
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessageValue(messageValue + emojiData.emoji);
  };

  return (
    <ChatRoomContainer>
      {!loadingMessages && !loadingUsers && (
        <>
          <OptionsArea>
            <IconButton onClick={goToSettings}>settings</IconButton>
            <IconButton onClick={signOut}>logout</IconButton>
          </OptionsArea>
          <UsersArea>
            {users &&
              users.length > 0 &&
              users.map((user: any, index: number) => (
                <UserStatus
                  nickname={user.nickname}
                  avatarUrl={user.avatarUrl}
                  key={`${user.uid}-${index}`}
                  uid={user.uid}
                  registeredUser={registeredUser}
                  lastMessageCreatedAt={getLastMessageCreatedAtByUser(user.uid)}
                />
              ))}
          </UsersArea>
          <MessagesArea ref={messagesAreaRef}>
            {processedMessages.length > 0 &&
              processedMessages.map((msg: any, index: number) => (
                <ChatMessage
                  key={`${msg.id}-${index}`}
                  message={msg}
                  registeredUser={registeredUser}
                />
              ))}
          </MessagesArea>
          <InputArea>
            <InputForm onSubmit={sendMessage}>
              <MessageInput
                aria-label='chat-message-input'
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                maxLength={255}
              />
              <EmojiButton onEmojiClick={onEmojiClick} />
              <IconButton
                type='submit'
                disabled={messageValue.length > 0 ? false : true}
              >
                send
              </IconButton>
            </InputForm>
          </InputArea>
        </>
      )}
    </ChatRoomContainer>
  );
};

export default ChatRoom;
