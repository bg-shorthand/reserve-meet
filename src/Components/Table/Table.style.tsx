import { COLORS } from 'const/const';
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
    display: block;
    width: 100%;
    height: ${props => {
      let height = 0;

      const curHour = props.curTime.getHours();
      const curMin = props.curTime.getMinutes();

      height = Math.floor(((curHour - 9) * 60 + curMin) / 30) * 35 - 1;

      console.log(curHour, curMin, height);

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
