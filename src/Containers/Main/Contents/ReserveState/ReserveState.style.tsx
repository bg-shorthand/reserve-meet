import { COLORS } from 'const/const';
import styled from 'styled-components';
import ReserveState from './ReserveState';

const StyledReserveState = styled(ReserveState)`
  padding: 20px;

  & > *:not(table) {
    margin: 20px 0;
  }

  & > section {
    background-color: ${COLORS.MAIN_GRAY};
    padding: 15px;
    padding-left: 50px;
    border-radius: 5px;
    display: flex;
  }
`;

export default StyledReserveState;
