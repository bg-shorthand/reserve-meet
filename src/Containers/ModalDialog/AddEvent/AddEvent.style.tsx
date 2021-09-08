import styled from 'styled-components';
import AddEvent from './AddEvent';

const StyledAddEvent = styled(AddEvent)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;

  .imposible {
    color: red;
  }

  & li {
    position: relative;

    & button {
      position: absolute;
      top: -3px;
      right: 5px;
    }
  }

  & li > button,
  & li > button * {
    margin: 0;
  }

  & > button {
    margin: 0;
    align-self: center;
  }

  & textarea {
    resize: none;
  }
`;

export default StyledAddEvent;
