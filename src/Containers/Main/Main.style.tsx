import { COLORS } from 'const/const';
import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;

  & > section:last-child {
    flex-grow: 1;
    background-color: ${COLORS.MAIN_BACKGROUND};
    color: ${COLORS.MAIN_FONT};
    padding: 20px 50px;
  }
`;

export default StyledMain;
