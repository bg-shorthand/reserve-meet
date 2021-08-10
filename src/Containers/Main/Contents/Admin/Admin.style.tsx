import styled from 'styled-components';
import Admin from './Admin';

const StyledAdmin = styled(Admin)`
  padding: 20px;

  & > div {
    max-width: 1000px;
    margin: 0 auto;
  }

  & h2 {
    font-size: 2rem;
    margin: 20px 0;
    font-weight: 600;
  }

  & > div > * {
    margin-bottom: 10px;
  }
`;

export default StyledAdmin;
