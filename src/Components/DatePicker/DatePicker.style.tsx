import styled from 'styled-components';
import DatePicker from './DatePicker';
import { COLORS } from 'const/const';

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  font-weight: 600;

  & input {
    background-color: ${COLORS.GRAY_LEVEL_1};
    border: 1px solid ${COLORS.GRAY_LEVEL_4};
    padding: 5px;
    margin: 0 10px;
    font-weight: inherit;
  }
`;

export default StyledDatePicker;
