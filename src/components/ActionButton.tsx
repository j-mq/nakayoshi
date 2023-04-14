import { signInWithGoogle } from '@/firebase/auth/login';
import styled from 'styled-components';

const ActionButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.primaryGradient};
  padding: 16px 40px;
  border-radius: 48px;
  border: none;
  color: ${(props) => props.theme.primaryLighter};
  font-size: 18px;
  cursor: pointer;
  transition: transform 150ms ease-in-out;
  font-weight: bold;
  box-shadow: ${(props) => props.theme.dropShadow};

  @media (min-width: 768px) {
    :hover {
      transform: scale(1.05);
      background: ${(props) => props.theme.primaryLight};
    }
  }

  &:active:hover {
    transform: scale(0.95);
    box-shadow: none;
  }
`;

type SignInProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const ActionButton = ({ onClick, children }: SignInProps) => {
  return (
    <ActionButtonStyle className='sign-in' onClick={onClick}>
      {children}
    </ActionButtonStyle>
  );
};

export default ActionButton;
