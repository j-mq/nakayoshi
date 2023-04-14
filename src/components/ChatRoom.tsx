import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import { db } from '@/firebase/config';
import { addMessage } from '@/firebase/collections/messages';
import ChatMessage from '@/components/ChatMessage';
import { getUsers } from '@/firebase/collections/users';

type ChatRoomProps = {
  registeredUser: any;
};

const ChatRoom = ({ registeredUser }: ChatRoomProps) => {
  const { uid, avatarUrl, nickname } = registeredUser;

  const [processedMessages, setProcessedMessages] = useState<any[]>([]);

  const messagesCollection = collection(db, 'messages');
  const messagesQuery = query(
    messagesCollection,
    orderBy('createdAt', 'desc'),
    limit(25)
  );

  const [messages, loading] = useCollectionData(messagesQuery, {
    idField: 'id',
  } as any);

  useEffect(() => {
    const getProcessedMessages = async () => {
      if (messages) {
        //Get all uids from messages
        const uids = messages.map((msg: any) => msg.uid);

        // @ts-ignore
        const uniqueUids = [...new Set(uids)];

        const users = await getUsers(uniqueUids);

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
  }, [messages]);

  const [formValue, setFormValue] = useState('');

  const dummy = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (formValue.length > 0) {
      await addMessage(formValue, uid, avatarUrl);
    }
    setFormValue('');
    // dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      Getting there
      <div>
        {processedMessages.length > 0 &&
          processedMessages.map((msg: any, index: number) => (
            <ChatMessage
              key={`${msg.id}-${index}`}
              message={msg}
              registeredUser={registeredUser}
            />
          ))}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </>
  );
};

export default ChatRoom;
