import styled from 'styled-components';
import WeeklySchedule from './WeeklySchedule';

const StyledWeeklySchedule = styled(WeeklySchedule)`
  table {
    border-collapse: collapse;
    width: 100%;

    & * {
      border: 1px solid black;
    }
  }
`;

export default StyledWeeklySchedule;
