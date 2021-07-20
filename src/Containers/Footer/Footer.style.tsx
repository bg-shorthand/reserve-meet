import { COLORS } from 'const/const';
import styled from 'styled-components';
import Footer from './Footer';

const StyledFooter = styled(Footer)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.TEAL_LEVEL_2};
`;

export default StyledFooter;
