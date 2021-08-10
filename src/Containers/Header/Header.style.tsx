import { COLORS } from 'const/const';
import styled from 'styled-components';
import Header from './Header';

const StyledHeader = styled(Header)`
  height: 100px;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.HEADER_BLACK};
  color: ${COLORS.HEADER_WHITE};

  h1 {
    flex-grow: 1;
  }

  figure {
    display: flex;
    align-items: center;
    margin: 0 20px;

    img {
      width: 2em;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
`;

export default StyledHeader;
