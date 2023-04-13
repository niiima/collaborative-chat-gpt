// import react from "react";
import { createGlobalStyle } from "styled-components";

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
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  }

*,
*:after,
*:before {
  box-sizing: border-box;
  font-family: 'Chivo Mono', sans-serif;
}

.flex.fill {
  height: 100%;
}

.flex.center {
  justify-content: center;
}


/* .cs-message--incoming .cs-message__content{
  background-color:#f6d365 !important;
} */

.cs-message--outgoing .cs-message__content{
  background-color:rgba(61,153,251,1) !important;
  /* color:#333; */
}

/* .cs-message--outgoing .cs-message__avatar{
  margin: -4px 5px 0 8px !important;
}
.cs-message--incoming .cs-message__avatar{
  margin: -4px 5px 0 8px !important;
} */
`;

export default GlobalStyles;
