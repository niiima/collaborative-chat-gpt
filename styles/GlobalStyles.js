// import react from "react";
import { createGlobalStyle } from "styled-components";
// @font-face {
//   font-family: 'Chivo Mono';
//   src: url('../assets/ChivoMono-VariableFont_wght.ttf');
//   src: url('../assets/ChivoMono-VariableFont_wght.ttf');
//   font-weight: 400;
//   font-style: normal;
// }
const GlobalStyles = createGlobalStyle`

#root {
    --main-color:rgb(0,127,212);
    --main-active-color:#39f;
    --active-color:rgb(50,139,248);
    --active-primary-color:#f6d365;
    --active-secondary-color:#f6d365;
}

:root {
    color-scheme: light dark;
}


@media (prefers-color-scheme: light) {
    :root {
        --text-primary: #24292e;
        --background: white;
        --shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px;
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --text-primary: white;
        --background: #24292e;
        --shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px 0px;
    }
}

html, body, #root {
    height: '100%';
    width: '100%'; margin: 0;
  padding: 0;
  }

body{
  margin: 0;
  padding: 0;
  overflow: hidden;
  user-select: none;
  font-family: 'Chivo Mono', sans-serif;

  /* font-family: Abel, system-ui;   */
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  /* cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,
    auto; */
  }

*,
*:after,
*:before {
  box-sizing: border-box;
  font-family: 'Chivo Mono', sans-serif;
}

.flex {
  display: flex;
  align-items: center;
}

.flex.fill {
  height: 100%;
}

.flex.center {
  justify-content: center;
}

.typo {
  /* font-family: 'IranNastaliq' !important; */
}
`;

export default GlobalStyles;
