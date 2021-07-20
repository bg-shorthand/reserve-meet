import { COLORS } from 'const/const';
import styled from 'styled-components';
import Menu from './Menu';

const StyledMenu = styled(Menu)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;
  background-color: ${COLORS.GRAY_LEVEL_2};

  & * {
    margin: 10px;
  }

  img {
    border-radius: 50%;
  }
  figcaption {
    text-align: center;
  }
`;

export default StyledMenu;
