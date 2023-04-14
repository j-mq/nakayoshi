import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import { db } from '@/firebase/config';
import { addMessage } from '@/firebase/collections/messages';
import ChatMessage from '@/components/ChatMessage';
import { getUsers } from '@/firebase/collections/users';
import Logout from './Logout';
import styled from 'styled-components';

const ChatRoomContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'options'
    'messages'
    'input';
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
  height: 84px;
  background: ${(props) => props.theme.primaryLight};
  padding: 24px;

  //Mobile
  @media (max-width: 768px) {
    height: 55px;
    padding: 8px;
  }
`;

const MessagesArea = styled.div`
  grid-area: messages;
  display: flex;
  flex-direction: column;
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
  height: 84px;
  background: ${(props) => props.theme.primaryLight};
  padding: 24px;

  @media (max-width: 768px) {
    height: 55px;
    padding: 8px;
  }
`;

type ChatRoomProps = {
  registeredUser: any;
  goToSettings: () => void;
  signOut: () => void;
};

const ChatRoom = ({ registeredUser, goToSettings, signOut }: ChatRoomProps) => {
  const { uid, avatarUrl, nickname } = registeredUser;

  const [processedMessages, setProcessedMessages] = useState<any[]>([]);

  const messagesCollection = collection(db, 'messages');
  const messagesQuery = query(
    messagesCollection,
    orderBy('createdAt', 'desc'),
    limit(25)
  );

  const messagesAreaRef = useRef<HTMLDivElement>(null);

  const [messages, loading] = useCollectionData(messagesQuery, {
    idField: 'id',
  } as any);

  useEffect(() => {
    const getProcessedMessages = async () => {
      if (messages) {
        const uids = messages.map((msg: any) => msg.uid);

        // @ts-ignore
        const uniqueUids = [...new Set(uids)];

        const users = await getUsers(uniqueUids);

        const newMessages = messages
          .map((msg: any) => {
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
          })
          .reverse();

        setProcessedMessages(newMessages);
      }
    };
    getProcessedMessages();
  }, [messages]);

  useEffect(() => {
    messagesAreaRef.current?.scrollTo(0, messagesAreaRef.current.scrollHeight);
  }, []);

  const [formValue, setFormValue] = useState('');

  const dummy = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (formValue.length > 0) {
      await addMessage(formValue, uid, avatarUrl);
    }
    setFormValue('');
    messagesAreaRef.current?.scrollTo(0, messagesAreaRef.current.scrollHeight);
  };

  return (
    <ChatRoomContainer>
      <OptionsArea>
        {registeredUser && (
          <>
            <button onClick={goToSettings}>Settings</button>
            <Logout signOut={signOut} />
          </>
        )}
      </OptionsArea>
      <MessagesArea ref={messagesAreaRef}>
        {processedMessages.length > 0 &&
          processedMessages.map((msg: any, index: number) => (
            <ChatMessage
              key={`${msg.id}-${index}`}
              message={msg}
              registeredUser={registeredUser}
            />
          ))}
        <div ref={dummy}></div>
      </MessagesArea>
      <InputArea>
        <form onSubmit={sendMessage}>
          <input
            type='text'
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </InputArea>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
