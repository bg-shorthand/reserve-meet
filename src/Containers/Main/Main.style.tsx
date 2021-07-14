import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;

  section:first-child {
    width: 300px;
  }

  section:last-child {
    flex-grow: 1;
  }
`;

export default StyledMain;
