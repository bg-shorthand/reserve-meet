import styled from 'styled-components';
import Admin from './Admin';

const StyledAdmin = styled(Admin)`
  padding: 20px;

  & > * {
    margin-bottom: 10px;
  }
`;

export default StyledAdmin;
