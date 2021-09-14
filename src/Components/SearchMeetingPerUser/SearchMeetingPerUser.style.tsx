import { COLORS } from 'const/const';
import styled from 'styled-components';
import SearchMeetingPerUser from './SearchMeetingPerUser';

const StyledSearchMeetingPerUser = styled(SearchMeetingPerUser)`
  background-color: ${COLORS.MAIN_GRAY};
  padding: 15px 50px;
  border-radius: 5px;

  & > *:not(:last-child) {
    margin-bottom: 1em;
  }

  h2 {
    font-weight: 500;
  }

  div {
    max-width: 500px;
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
      text-align: center;
    }
    & tr:first-child th,
    & tr:first-child td {
      border-top: 3px solid ${COLORS.TH_BORDER};
    }
    & tr:last-child th,
    & tr:last-child td {
      border-bottom: 3px solid ${COLORS.TH_BORDER};
    }
    & td * {
      margin: 0;
      padding: 0;
    }

    .isMeeting {
      cursor: pointer;
    }
  }
`;

export default StyledSearchMeetingPerUser;
