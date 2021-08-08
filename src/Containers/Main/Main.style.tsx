import { COLORS } from 'const/const';
import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;

  & > section:first-child {
    min-width: 200px;
  }

  & > section:last-child {
    flex-grow: 1;
    background-color: ${COLORS.GRAY_LEVEL_1};
    padding: 20px 50px;
  }
`;

export default StyledMain;
