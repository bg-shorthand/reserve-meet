import { COLORS, END_TIME } from 'const/const';
import { NONAME } from 'dns';
import { useRecoilValue } from 'recoil';
import { curDateState } from 'state/state';
import styled from 'styled-components';
import Table from './Table';

const StyledTable = styled(Table)`
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
    height: ${props => {
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
          : Math.floor(((curHour - 10) * 60 + curMin) / 30 + 1) * 35 - 1;
      return height + 'px';
    }};
    border-bottom: 1px solid red;
    position: absolute;
    z-index: 99;
    background: rgba(203, 241, 245, 0.01);
    backdrop-filter: blur(2px);
  }

  td {
    position: relative;
  }

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
