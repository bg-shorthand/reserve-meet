import styled from 'styled-components';
import Alert from './Alert';

const StyledAlert = styled(Alert)`
  text-align: center;
  p {
    margin: 20px 0;
  }
  div {
    display: flex;
    justify-content: center;
    margin: 0;

    button {
      margin: 0 10px;
    }
  }
`;

export default StyledAlert;
