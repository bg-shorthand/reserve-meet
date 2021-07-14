import styled from 'styled-components';
import Header from './Header';

const StyledHeader = styled(Header)`
  height: 50px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export default StyledHeader;
