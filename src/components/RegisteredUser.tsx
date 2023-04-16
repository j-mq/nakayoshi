import styled from 'styled-components';

type StyleProps = {
  isSelf: boolean;
};

const RegisteredUserContainer = styled.div<StyleProps>`
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
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 4px;
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
  font-family: ${(props) => props.theme.secondaryFont};
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

type RegisteredUserProps = {
  nickname: string;
  avatarUrl: string;
  uid: string;
  registeredUser: any;
};

const RegisteredUser = ({
  nickname,
  avatarUrl,
  uid,
  registeredUser,
}: RegisteredUserProps) => {
  const isSelf = uid === registeredUser.uid;

  return (
    <RegisteredUserContainer isSelf={isSelf}>
      <TopContainer isSelf={isSelf}>
        <ImageContainer isSelf={isSelf}>
          <Image src={avatarUrl} alt={`user-${uid}`}></Image>
        </ImageContainer>
        <NameTag isSelf={isSelf}>{nickname}</NameTag>
      </TopContainer>
    </RegisteredUserContainer>
  );
};

export default RegisteredUser;
