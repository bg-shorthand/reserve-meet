import { COLORS } from 'const/const';
import styled from 'styled-components';
import Signin from './Signin';

const StyledSignin = styled(Signin)`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: ${COLORS.HEADER_WHITE};

  h1 {
    margin-bottom: 50px;
  }
`;

export default StyledSignin;
