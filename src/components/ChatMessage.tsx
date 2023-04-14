import styled from 'styled-components';

type StyleProps = {
  isSelf: boolean;
};

const ChatMessageContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${(props) => (props.isSelf ? 'flex-end' : 'flex-start')};
`;

const TopContainer = styled.div<StyleProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: ${(props) => (props.isSelf ? 'row-reverse' : 'row')};
`;

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
  padding: ${(props) =>
    props.isSelf ? '8px 40px 8px 16px' : '8px 16px 8px 40px'};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryDark : props.theme.secondaryDark};
  color: ${(props) =>
    props.isSelf ? props.theme.primaryLighter : props.theme.secondaryLighter};
  margin-right: ${(props) => (props.isSelf ? '-40px' : '0px')};
  margin-left: ${(props) => (props.isSelf ? '0px' : '-40px')};
  border-radius: ${(props) =>
    props.isSelf ? '8px 0 0 48px' : '0 8px 48px 0px'};
  font-weight: 600;
  font-size: 18px;

  @media (max-width: 768px) {
    height: 35px;
    margin-right: ${(props) => (props.isSelf ? '-30px' : '0px')};
    margin-left: ${(props) => (props.isSelf ? '0px' : '-30px')};
    padding: ${(props) =>
      props.isSelf ? '6px 30px 6px 12px' : '6px 12px 6px 30px'};
    font-size: 14px;
  }
`;

const Body = styled.div<StyleProps>`
  min-width: 200px;
  width: fit-content;
  max-width: 66%;
  height: fit-content;
  max-height: 200px;
  min-height: 80px;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryLight : props.theme.secondaryLight};
  border-radius: 24px;
  padding: ${(props) =>
    props.isSelf ? '4px 32px 32px 32px' : '4px 32px 32px 32px'};
  margin: ${(props) =>
    props.isSelf ? '-50px 50px 0px 0px' : '-50px 0px 0px 50px'};
  position: relative;
  color: ${(props) =>
    props.isSelf ? props.theme.primaryDarker : props.theme.secondaryDarker};

  @media (max-width: 768px) {
    margin: ${(props) =>
      props.isSelf ? '-40px 40px 0px 0px' : '-40px 0px 0px 40px'};
    padding: ${(props) =>
      props.isSelf ? '4px 24px 24px 24px' : '4px 24px 24px 24px'};
  }
`;

const Tail = styled.div<StyleProps>`
  position: absolute;
  top: -20px;
  border-radius: ${(props) =>
    props.isSelf ? '8px 24px 0px 24px' : '24px 8px 24px 0px'};
  right: ${(props) => (props.isSelf ? 'auto' : '-20px')};
  left: ${(props) => (props.isSelf ? '-20px' : 'auto')};

  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryLight : props.theme.secondaryLight};

  @media (max-width: 768px) {
    top: -15px;
    width: 30px;
    height: 30px;
    border-radius: ${(props) =>
      props.isSelf ? '6px 18px 0px 18px' : '18px 6px 18px 0px'};
    right: ${(props) => (props.isSelf ? 'auto' : '-15px')};
    left: ${(props) => (props.isSelf ? '-15px' : 'auto')};
  }
`;

const DateStamp = styled.div<StyleProps>`
  color: inherit;
  font-size: 12px;
  text-align: left;
  margin-bottom: 16px;
  margin-left: ${(props) => (props.isSelf ? '0px' : '16px')};
  margin-right: ${(props) => (props.isSelf ? '16px' : '0px')};
  @media (max-width: 768px) {
    margin-bottom: 12px;
    margin-left: ${(props) => (props.isSelf ? '0px' : '12px')};
    margin-right: ${(props) => (props.isSelf ? '12px' : '0px')};
  }
`;

const Message = styled.div`
  color: inherit;
  font-size: 16px;
  height: 100%;
  max-height: 150px;
  overflow: auto;
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

  const getDate = (createdAt: any) => {
    if (createdAt) {
      const date = new Date(createdAt.seconds * 1000);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    } else {
      return '';
    }
  };

  const isSelf = uid === registeredUser.uid;

  return (
    <ChatMessageContainer isSelf={isSelf}>
      <TopContainer isSelf={isSelf}>
        <ImageContainer isSelf={isSelf}>
          <Image src={photoURL} alt={`user-${uid}`}></Image>
        </ImageContainer>
        <NameTag isSelf={isSelf}>{nickname}</NameTag>
      </TopContainer>
      <Body isSelf={isSelf}>
        <DateStamp isSelf={isSelf}>{getDate(createdAt)}</DateStamp>
        <Message>{text}</Message>
        <Tail isSelf={isSelf} />
      </Body>
    </ChatMessageContainer>
  );
};

export default ChatMessage;
