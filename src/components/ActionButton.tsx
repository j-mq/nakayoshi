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
  font-weight: bold;
  box-shadow: ${(props) => props.theme.dropShadow};

  @media (min-width: 768px) {
    :hover:enabled {
      transform: scale(1.05);
      background: ${(props) => props.theme.primaryLight};
    }
  }

  :active:hover:enabled {
    transform: scale(0.95);
    box-shadow: none;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

type ActionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const ActionButton = ({ onClick, children, disabled }: ActionButtonProps) => {
  return (
    <ActionButtonStyle
      className='sign-in'
      onClick={onClick}
      disabled={disabled ? disabled : false}
    >
      {children}
    </ActionButtonStyle>
  );
};

export default ActionButton;
