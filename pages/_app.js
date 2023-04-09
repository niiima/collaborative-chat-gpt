// import "../styles/styles.scss";
import React from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatProvider } from "../context/ChatContext";
import { UIContextProvider } from "../context/UIContext";
import { AIProvider } from "../context/AIContext";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyles from "../styles/GlobalStyles";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      {" "}
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <UIContextProvider>
          <ChatProvider>
            <AIProvider>
              <Component {...pageProps} />
            </AIProvider>
          </ChatProvider>
        </UIContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
