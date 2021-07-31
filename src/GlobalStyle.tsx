import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { COLORS } from 'const/const';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 14px;
    color: ${COLORS.BLACK}
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
    border: none;
    background-color: transparent;
    font: inherit;

    &:disabled {
      cursor: not-allowed;
    }
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  .a11y-hidden {
    overflow: hidden; position: absolute; clip: rect(0 0 0 0); clip: rect(0,0,0,0); width: 1px; height: 1px; margin: -1px; border: 0; padding: 0;
  }
`;

export default GlobalStyle;
