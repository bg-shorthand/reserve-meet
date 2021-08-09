import styled from 'styled-components';
import ReserveTable from './ReserveTable';
import { useRecoilValue } from 'recoil';
import { curDateState } from 'state/state';
import { COLORS, END_TIME, TABLE_CELL_HEIGHT, TABLE_CELL_PADDING } from 'const/const';

const StyledReserveTable = styled(ReserveTable)`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  table-layout: fixed;

  thead {
    position: relative;
  }

  thead::after {
    content: '';
    display: ${() => {
      const curDate = useRecoilValue(curDateState);
      const current = new Date().getTime() + 1000 * 60 * 60 * 9;
      return curDate === new Date(current).toISOString().slice(0, 10) ||
        curDate < new Date(current).toISOString().slice(0, 10)
        ? 'block'
        : 'none';
    }};
    width: 100%;
    top: ${props => {
      let height = 0;
      const curDate = useRecoilValue(curDateState);
      const current = new Date().getTime() + 1000 * 60 * 60 * 9;
      const curHour = props.curTime.getHours();
      const curMin = props.curTime.getMinutes();
      height =
        curDate < new Date(current).toISOString().slice(0, 10)
          ? 489
          : curHour >= END_TIME
          ? 489
          : Math.floor(((curHour - 10) * 60 + curMin) / 30 + 1) * TABLE_CELL_HEIGHT - 1;
      return (height < 0 ? 0 + TABLE_CELL_HEIGHT : height + TABLE_CELL_HEIGHT) + 'px';
    }};
    border-bottom: 1px solid red;
    position: absolute;
    z-index: 99;
  }

  td {
    position: relative;
    cursor: pointer;
  }

  & th,
  & td {
    border-bottom: 1px solid ${COLORS.TEAL_LEVEL_2};
    border-right: 1px solid ${COLORS.TEAL_LEVEL_2};
    padding: ${TABLE_CELL_PADDING + 'px'} 10px;
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

  & article {
    cursor: pointer;
  }
`;

export default StyledReserveTable;
