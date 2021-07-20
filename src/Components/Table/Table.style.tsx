import { COLORS } from 'const/const';
import styled from 'styled-components';
import Table from './Table';

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  table-layout: fixed;

  & th,
  & td {
    border-bottom: 1px solid ${COLORS.TEAL_LEVEL_2};
    border-right: 1px solid ${COLORS.TEAL_LEVEL_2};
    padding: 10px;
  }

  & th:last-child,
  & td:last-child {
    border-right: none;
  }

  & tbody tr:last-child th,
  & tbody tr:last-child td {
    border-bottom: none;
  }

  & tr th:first-child {
    width: 100px;
  }
`;

export default StyledTable;
