import styled from 'styled-components';
import Floor from './Floor';

const StyledFloor = styled(Floor)`
  display: flex;
  justify-content: center;

  & > li {
    cursor: pointer;
    padding: 10px;
    margin: 0 7px;
  }

  .cur-floor {
    font-weight: 700;
  }
`;

export default StyledFloor;
