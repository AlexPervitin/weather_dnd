import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }
  *,
  *::before,
  *::after {
  box-sizing: border-box;
}

`;

export default Global;
