import styled from 'styled-components';
import RapidAddEvent from './RapidAddEvent';

const StyledRapidAddEvent = styled(RapidAddEvent)`
  display: flex;
  flex-flow: column;

  div {
    display: flex;
    justify-content: space-between;

    & > * {
      flex-grow: 1;
    }

    & > input {
      margin-right: 10px;
    }
  }
`;

export default StyledRapidAddEvent;
