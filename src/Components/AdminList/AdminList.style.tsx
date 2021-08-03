import styled from 'styled-components';
import AdminList from './AdminList';

const StyledAdminList = styled(AdminList)`
  max-width: 200px;
  margin-bottom: 20px;

  & ul {
    margin-bottom: 10px;
  }
`;

export default StyledAdminList;
