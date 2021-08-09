import { COLORS } from 'const/const';
import styled from 'styled-components';
import ViewEvent from './ViewEvent';

const StyledViewEvent = styled(ViewEvent)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;

  h1 {
    word-break: break-all;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    & * {
      padding: 10px;
    }

    & th,
    & td {
      border-right: 1px solid ${COLORS.TEAL_LEVEL_2};
      border-bottom: 1px solid ${COLORS.TEAL_LEVEL_2};
    }
    & td * {
      margin: 0;
      padding: 0;
    }

    & tr:last-child th,
    & tr:last-child td {
      border-bottom: none;
    }
    & td:last-child {
      border-right: none;
    }
  }
`;

export default StyledViewEvent;
