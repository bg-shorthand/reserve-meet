import { COLORS } from 'const/const';
import styled from 'styled-components';
import Header from './Header';

const StyledHeader = styled(Header)`
  height: 100px;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.TEAL_LEVEL_2};
  box-shadow: 0px 5px 5px black;
`;

export default StyledHeader;
