type ChatRoomProps = {
  message: {
    text: string;
    uid: string;
    photoURL: string;
  };
  auth: any;
};

const ChatRoom = ({ message, auth }: ChatRoomProps) => {
  const { text, uid, photoURL } = message;
  console.log('the message', message);

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={`user-${uid}`}></img>
      <p>{text}</p>
    </div>
  );
};

export default ChatRoom;
