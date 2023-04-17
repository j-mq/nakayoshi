import styled from 'styled-components';

const IconButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.secondaryGradient};
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.dropShadow};

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .material-symbols-outlined {
    color: ${(props) => props.theme.secondaryLighter};
    font-size: 24px;
  }

  @media (min-width: 768px) {
    :hover:enabled {
      transform: scale(1.05);
      background: ${(props) => props.theme.secondaryLight};
    }
  }

  :active:hover:enabled {
    transform: scale(0.9);
    box-shadow: none;
    background: ${(props) => props.theme.secondaryDark};
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: none;
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
