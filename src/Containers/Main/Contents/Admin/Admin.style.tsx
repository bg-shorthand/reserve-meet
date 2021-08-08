import styled from 'styled-components';
import Admin from './Admin';

const StyledAdmin = styled(Admin)`
  padding: 20px;

  & h2 {
    font-size: 2rem;
    margin: 10px 0 20px;
    font-weight: 700;
  }

  & > * {
    margin-bottom: 10px;
  }
`;

export default StyledAdmin;
