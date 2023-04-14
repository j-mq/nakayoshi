import { signInWithGoogle } from '@/firebase/auth/login';
import styled from 'styled-components';

const IconButtonStyle = styled.button`
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

type IconButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const IconButton = ({ onClick, children }: IconButtonProps) => {
  return (
    <IconButtonStyle className='sign-in' onClick={onClick}>
      <span className='material-symbols-outlined'>{children}</span>
    </IconButtonStyle>
  );
};

export default IconButton;
