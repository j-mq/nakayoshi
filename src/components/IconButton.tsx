import { signInWithGoogle } from '@/firebase/auth/login';
import styled from 'styled-components';

const IconButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  padding: 0px;
  border: none;
  color: ${(props) => props.theme.primaryLighter};
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .material-symbols-outlined {
    color: ${(props) => props.theme.secondary};
    font-size: 28px;
  }

  @media (min-width: 768px) {
    :hover:enabled {
      transform: scale(1.1);
    }
  }

  :active:hover:enabled {
    transform: scale(0.9);
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

type IconButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
};

const IconButton = ({ onClick, children, type, disabled }: IconButtonProps) => {
  return (
    <IconButtonStyle
      className='sign-in'
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disabled ? disabled : false}
    >
      <span className='material-symbols-outlined'>{children}</span>
    </IconButtonStyle>
  );
};

export default IconButton;
