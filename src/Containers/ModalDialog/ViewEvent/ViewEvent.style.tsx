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
      border: 1px solid ${COLORS.TABLE_BORDER};
    }
    & tr:first-child th,
    & tr:first-child td {
      border-top: 3px solid ${COLORS.TABLE_BORDER};
    }
    & tr:last-child th,
    & tr:last-child td {
      border-bottom: 3px solid ${COLORS.TABLE_BORDER};
    }
    & td * {
      margin: 0;
      padding: 0;
    }
  }
`;

export default StyledViewEvent;
