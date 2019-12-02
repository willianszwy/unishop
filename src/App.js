import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

const App = () => (
    <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <>
                <GlobalStyles />
                <Routes />
            </>
        </ThemeProvider>
    </SnackbarProvider>
);

export default App;
