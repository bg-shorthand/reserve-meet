import styled from 'styled-components';
import Menu from './Menu';

const StyledMenu = styled(Menu)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;

  & * {
    margin: 10px;
  }
`;

export default StyledMenu;
