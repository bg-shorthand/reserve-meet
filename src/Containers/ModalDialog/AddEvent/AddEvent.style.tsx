import { COLORS } from 'const/const';
import styled from 'styled-components';
import AddEvent from './AddEvent';

const StyledAddEvent = styled(AddEvent)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;

  table {
    width: 100%;
    border-collapse: collapse;

    h1 {
      align-self: center;
    }

    & * {
      padding: 10px;
    }

    & th,
    & td {
      border-right: 1px solid ${COLORS.TEAL_LEVEL_2};
      border-bottom: 1px solid ${COLORS.TEAL_LEVEL_2};
    }

    & tr:last-child th,
    & tr:last-child td {
      border-bottom: none;
    }
    & td:last-child {
      border-right: none;
    }

    select {
      margin: 0;
      padding: 0;
    }
  }

  .imposible {
    span {
      color: red;
    }
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
  }

  & textarea {
    resize: none;
  }
`;

export default StyledAddEvent;
