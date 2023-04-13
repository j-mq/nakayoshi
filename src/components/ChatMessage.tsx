type ChatRoomProps = {
  message: {
    text: string;
    uid: string;
    photoURL: string;
  };
  registeredUser: any;
};

const ChatRoom = ({ message, registeredUser }: ChatRoomProps) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === registeredUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={`user-${uid}`}></img>
      <p>{text}</p>
    </div>
  );
};

export default ChatRoom;
