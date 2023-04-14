import styled from 'styled-components';

const ChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

type StyleProps = {
  isSelf: boolean;
};

const ImageContainer = styled.div<StyleProps>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  padding: 8px;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryDark : props.theme.secondaryDark};

  z-index: 3;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    padding: 6px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const NameTag = styled.div<StyleProps>`
  height: 45px;
  padding: 8px 16px 8px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryDark : props.theme.secondaryDark};
  color: ${(props) =>
    props.isSelf ? props.theme.primaryLighter : props.theme.secondaryLighter};
  margin-left: -40px;
  border-radius: 0 8px 48px 0px;
  font-weight: 600;
  font-size: 18px;

  @media (max-width: 768px) {
    height: 35px;
    margin-left: -30px;
    padding: 6px 12px 6px 30px;
    font-size: 14px;
  }
`;

const Body = styled.div<StyleProps>`
  width: fit-content;
  max-width: 66%;
  height: fit-content;
  min-height: 80px;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryLight : props.theme.secondaryLight};
  border-radius: 24px;
  padding: 4px 32px 32px 32px;
  margin: -50px 0 0 50px;
  position: relative;
  color: ${(props) =>
    props.isSelf ? props.theme.primaryDarker : props.theme.secondaryDarker};

  @media (max-width: 768px) {
    margin: -40px 0 0 40px;
    padding: 4px 24px 24px 24px;
  }
`;

const Tail = styled.div<StyleProps>`
  position: absolute;
  right: -20px;
  border-radius: 24px 8px 24px 0px;
  top: -20px;
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryLight : props.theme.secondaryLight};

  @media (max-width: 768px) {
    right: -15px;
    top: -15px;
    width: 30px;
    height: 30px;
    border-radius: 18px 6px 18px 0px;
  }

  z-index: 0;
`;

const DateStamp = styled.div`
  color: inherit;
  font-size: 12px;
  text-align: left;
  margin-bottom: 16px;
  margin-left: 16px;
  @media (max-width: 768px) {
    margin-bottom: 12px;
    margin-left: 12px;
  }
`;

const Message = styled.div`
  color: inherit;
  font-size: 16px;
`;

type ChatMessageProps = {
  message: {
    text: string;
    uid: string;
    photoURL: string;
    nickname: string;
    createdAt: any;
  };
  registeredUser: any;
};

const ChatMessage = ({ message, registeredUser }: ChatMessageProps) => {
  const { text, uid, photoURL, nickname, createdAt } = message;

  const messageClass = uid === registeredUser.uid ? 'sent' : 'received';

  const date = new Date(createdAt.seconds * 1000);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const isSelf = uid === registeredUser.uid;

  return (
    <ChatMessageContainer>
      <TopContainer>
        <ImageContainer isSelf={isSelf}>
          <Image src={photoURL} alt={`user-${uid}`}></Image>
        </ImageContainer>
        <NameTag isSelf={isSelf}>{nickname}</NameTag>
      </TopContainer>
      <Body isSelf={isSelf}>
        <DateStamp>{dateString}</DateStamp>
        <Message>{text}</Message>
        <Tail isSelf={isSelf} />
      </Body>
    </ChatMessageContainer>
  );
};

export default ChatMessage;
