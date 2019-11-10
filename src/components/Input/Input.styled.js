import styled from "styled-components";

export const StyledInput = styled.input`
    display: block;
    width: 100%;
    background: white;
    color: black;
    border: 2px solid black;
    padding: 1em;
    margin: 0.5em 0;
    font-size: ${props => props.theme.fontSize};
    border-radius: ${props => props.theme.borderRadius};
`;
