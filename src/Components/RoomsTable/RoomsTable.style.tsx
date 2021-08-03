import { COLORS } from 'const/const';
import styled from 'styled-components';
import RoomsTable from './RoomsTable';

const StyledRoomsTable = styled(RoomsTable)`
  max-width: 500px;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    & > * {
    }

    & th,
    & td {
      padding: 10px;
      border-right: 1px solid ${COLORS.TEAL_LEVEL_2};
      border-bottom: 1px solid ${COLORS.TEAL_LEVEL_2};
    }

    & tr:last-child td {
      border-bottom: none;
    }

    & tbody tr:last-child th {
      border-bottom: none;
    }

    & td:last-child,
    & th:last-child {
      border-right: none;
    }

    & li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;

export default StyledRoomsTable;
