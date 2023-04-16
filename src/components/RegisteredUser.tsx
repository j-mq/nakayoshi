import styled from 'styled-components';

type StyleProps = {
  isSelf: boolean;
};

const RegisteredUserContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopContainer = styled.div<StyleProps>`
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div<StyleProps>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 4px;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryDark : props.theme.secondaryDark};

  z-index: 3;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const NameTag = styled.div<StyleProps>`
  font-family: ${(props) => props.theme.secondaryFont};
  height: 32px;
  padding: 8px 16px 8px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isSelf ? props.theme.primaryDark : props.theme.secondaryDark};
  color: ${(props) =>
    props.isSelf ? props.theme.primaryLighter : props.theme.secondaryLighter};
  margin-left: -32px;
  border-radius: 0 8px 48px 0px;
  font-weight: 600;
  font-size: 14px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Nickname = styled.div`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LastMessageDate = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: ${(props) => props.theme.primaryLighter};
  margin-top: -30px;
  margin-left: 70px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LastMessageDateText = styled.span`
  font-size: inherit;
  color: inherit;
`;

type RegisteredUserProps = {
  nickname: string;
  avatarUrl: string;
  uid: string;
  registeredUser: any;
  lastMessageCreatedAt?: string;
};

const RegisteredUser = ({
  nickname,
  avatarUrl,
  uid,
  registeredUser,
  lastMessageCreatedAt,
}: RegisteredUserProps) => {
  const isSelf = uid === registeredUser.uid;

  const getDate = (createdAt: any) => {
    if (createdAt) {
      const date = new Date(createdAt.seconds * 1000);
      const formattedDate =
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`.replace(
          /\b(\d)\b/g,
          '0$1'
        );

      return formattedDate;
    } else {
      return '';
    }
  };

  return (
    <RegisteredUserContainer isSelf={isSelf}>
      <TopContainer isSelf={isSelf}>
        <ImageContainer isSelf={isSelf}>
          <Image src={avatarUrl} alt={`user-${uid}`}></Image>
        </ImageContainer>
        <NameTag isSelf={isSelf}>
          <Nickname>{nickname}</Nickname>
        </NameTag>
      </TopContainer>
      <LastMessageDate>
        <LastMessageDateText>Last Activity:</LastMessageDateText>
        <LastMessageDateText>
          {getDate(lastMessageCreatedAt)}
        </LastMessageDateText>
      </LastMessageDate>
    </RegisteredUserContainer>
  );
};

export default RegisteredUser;
