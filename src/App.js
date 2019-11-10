import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";

const App = () => (
    <ThemeProvider theme={theme}>
        <>
            <GlobalStyles />
            <Routes />
        </>
    </ThemeProvider>
);

export default App;
