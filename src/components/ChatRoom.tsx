import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useState, useRef } from 'react';
import { db } from '@/firebase/config';
import { addMessage } from '@/firebase/collections/messages';
import ChatMessage from '@/components/ChatMessage';

type ChatRoomProps = {
  registeredUser: any;
};

const ChatRoom = ({ registeredUser }: ChatRoomProps) => {
  const { uid, avatarUrl, nickname } = registeredUser;

  const messagesCollection = collection(db, 'messages');
  const messagesQuery = query(
    messagesCollection,
    orderBy('createdAt', 'desc'),
    limit(25)
  );

  const [messages] = useCollectionData(messagesQuery, { idField: 'id' } as any);

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
        {messages &&
          messages.map((msg: any, index: number) => (
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
