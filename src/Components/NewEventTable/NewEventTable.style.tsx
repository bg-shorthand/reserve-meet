import { COLORS } from 'const/const';
import styled from 'styled-components';
import NewEventTable from './NewEventTable';

const StyledNewEventTable = styled(NewEventTable)`
  width: 100%;
  border-collapse: collapse;

  h1 {
    align-self: center;
  }

  & * {
    padding: 10px;
  }

  & th,
  & td {
    border: 1px solid ${COLORS.TABLE_BORDER};
  }
  & tr:first-child th,
  & tr:first-child td {
    border-top: 3px solid ${COLORS.TH_BORDER};
  }
  & tr:last-child th,
  & tr:last-child td {
    border-bottom: 3px solid ${COLORS.TH_BORDER};
  }

  select,
  input {
    margin: 0;
    padding: 0;
  }
`;

export default StyledNewEventTable;
