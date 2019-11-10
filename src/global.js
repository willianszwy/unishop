// global.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html, body {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}


*, *::after, *::before {
    box-sizing: border-box;
}

body {
    
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primaryLight};
    
    /* height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center; */
    

    /* background: linear-gradient(90deg, rgb(160, 222, 219),rgb(3, 165, 209)); */

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-rendering: optimizeLegibility;
}`;
