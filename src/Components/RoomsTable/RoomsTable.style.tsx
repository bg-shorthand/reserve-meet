import { COLORS, TABLE_CELL_PADDING } from 'const/const';
import styled from 'styled-components';
import RoomsTable from './RoomsTable';

const StyledRoomsTable = styled(RoomsTable)`
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    table-layout: fixed;

    thead {
      position: relative;
      background-color: ${COLORS.TH_BACKGROUND};
      border-top: 3px solid ${COLORS.TH_BORDER};
    }

    th {
      border: 1px solid ${COLORS.TABLE_BORDER};
      padding: ${TABLE_CELL_PADDING + 'px'} 10px;
    }

    td {
      transition: all 200ms;
      border: 1px solid ${COLORS.TABLE_BORDER};
      padding: ${TABLE_CELL_PADDING + 'px'} 100px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    td:hover {
      background-color: ${COLORS.GRAY_LEVEL_2} !important;
    }

    thead * {
      padding: 10px;
    }

    tbody {
      border-bottom: 3px solid ${COLORS.TABLE_BORDER};
    }

    tr th:first-child {
      width: 100px;
    }

    th > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 10px;
    }

    tr:last-child > td {
      padding-left: 20px;

      input {
        margin-right: 20px;
      }
    }
  }
`;

export default StyledRoomsTable;
