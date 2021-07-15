import styled from 'styled-components';
import Table from './Table';

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  margin: 0;

  & > * {
    width: 100%;
  }

  & * {
    border: 1px solid black;
  }
`;

export default StyledTable;
