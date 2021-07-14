import styled from 'styled-components';
import Floor from './Floor';

const StyledFloor = styled(Floor)`
  display: flex;

  & > li {
    cursor: pointer;
  }
`;

export default StyledFloor;
