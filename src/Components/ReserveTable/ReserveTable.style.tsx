import styled from 'styled-components';
import ReserveTable from './ReserveTable';
import { useRecoilValue } from 'recoil';
import { curDateState } from 'state/state';
import { COLORS, END_TIME, TABLE_CELL_HEIGHT, TABLE_CELL_PADDING, TABLE_HEIGHT } from 'const/const';

const StyledReserveTable = styled(ReserveTable)`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  table-layout: fixed;

  thead {
    position: relative;
    background-color: ${COLORS.TH_BACKGROUND};
    border-top: 3px solid ${COLORS.TH_BORDER};
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
          ? TABLE_HEIGHT
          : curHour >= END_TIME
          ? TABLE_HEIGHT
          : Math.floor(((curHour - 10) * 60 + curMin) / 30 + 1) * TABLE_CELL_HEIGHT - 1;
      return (height < 0 ? 0 + TABLE_CELL_HEIGHT : height + TABLE_CELL_HEIGHT) - 32 + 'px';
    }};
    border-bottom: 1px solid red;
    position: absolute;
    z-index: 99;
  }

  td {
    position: relative;
    cursor: pointer;
    transition: all 200ms;
  }
  td:hover {
    background-color: ${COLORS.GRAY_LEVEL_2} !important;
  }

  th,
  td {
    border: 1px solid ${COLORS.TABLE_BORDER};
    padding: ${TABLE_CELL_PADDING + 'px'} 10px;
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

  article {
    cursor: pointer;
  }
`;

export default StyledReserveTable;
