import styled from 'styled-components';
import DatePicker from './DatePicker';
import { COLORS } from 'const/const';

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    background-color: ${COLORS.GRAY_LEVEL_1};
    border: none;
  }
`;

export default StyledDatePicker;
