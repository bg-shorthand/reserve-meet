import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 14px;
  }
  body, body * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;

    &:visited {
      color: inherit;
    }
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;