import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import { db } from '@/firebase/config';
import { addMessage } from '@/firebase/collections/messages';
import ChatMessage from '@/components/ChatMessage';
import { getUsers } from '@/firebase/collections/users';
import styled from 'styled-components';
import IconButton from './IconButton';

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
  height: fit-content;
  background: ${(props) => props.theme.primaryLight};
  padding: 24px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  z-index: 3;

  @media (max-width: 768px) {
    padding: 16px;
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
  registeredUser: any;
  goToSettings: () => void;
  signOut: () => void;
};

const ChatRoom = ({ registeredUser, goToSettings, signOut }: ChatRoomProps) => {
  const [processedMessages, setProcessedMessages] = useState<any[]>([]);
  const [messageValue, setMessageValue] = useState<string>('');

  const { uid, avatarUrl, nickname } = registeredUser;

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

  const dummy = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (messageValue.length > 0) {
      await addMessage(messageValue, uid, avatarUrl);
    }
    setMessageValue('');
    messagesAreaRef.current?.scrollTo(0, messagesAreaRef.current.scrollHeight);
  };

  return (
    <ChatRoomContainer>
      <OptionsArea>
        <IconButton onClick={goToSettings}>settings</IconButton>
        <IconButton onClick={signOut}>logout</IconButton>
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
        <InputForm onSubmit={sendMessage}>
          <MessageInput
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <IconButton
            type='submit'
            disabled={messageValue.length > 0 ? false : true}
          >
            Send
          </IconButton>
        </InputForm>
      </InputArea>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
