import styled from 'styled-components';

type JumpingRabbitContainerProps = {
  type: 'loading' | 'title';
};

const JumpingRabbitContainer = styled.main<JumpingRabbitContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .material-symbols-outlined {
    color: ${(props) =>
      props.type === 'loading'
        ? props.theme.primaryLighter
        : props.theme.primary};
    font-size: 100px;
    transform-origin: bottom;
    animation: jump 1s infinite;

    @keyframes jump {
      0% {
        transform-origin: bottom;
        transform: scale(1) translateY(0);
      }
      50% {
        transform-origin: bottom;
        transform: scale(1, 0.9) translateY(10px);
      }
      100% {
        transform-origin: bottom;
        transform: scale(1);
      }
    }
  }
`;

type JumpingRabbitProps = {
  type: 'loading' | 'title';
};

const JumpingRabbit = ({ type }: JumpingRabbitProps) => {
  return (
    <JumpingRabbitContainer type={type}>
      <div className='material-symbols-outlined'>cruelty_free</div>
    </JumpingRabbitContainer>
  );
};

export default JumpingRabbit;
