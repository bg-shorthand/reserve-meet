import { COLORS } from 'const/const';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: ${COLORS.BUTTON_BLUE_1};
  color: ${COLORS.HEADER_WHITE};
  padding: 7px 20px;
  border-radius: 2px;
  transition: all 200ms;

  &:hover {
    background-color: ${COLORS.BUTTON_BLUE_2};
  }
`;

export default StyledButton;
