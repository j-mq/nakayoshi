import styled from 'styled-components';

const ErrorContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .material-symbols-outlined {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: ${(props) => props.theme.primaryLighter};
    font-size: 100px;
    transform: rotate(180deg);
  }
`;

const ErrorText = styled.div`
  font-size: 24px;
  margin-bottom: 16px;
  font-family: ${(props) => props.theme.secondaryFont};
  color: ${(props) => props.theme.primaryLighter};
`;

type ErrorMessageProps = {};

const ErrorMessage = ({}: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      <ErrorText>Something Went Wrong...</ErrorText>
      <div className='material-symbols-outlined'>cruelty_free</div>
    </ErrorContainer>
  );
};

export default ErrorMessage;
