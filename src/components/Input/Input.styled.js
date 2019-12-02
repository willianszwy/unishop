import styled from "styled-components";

export const StyledInput = styled.input`
    display: block;
    width: 100%;
    background: ${props => props.theme.grey100};
    color: black;
    /* border: none; */
    border: 2px solid ${props => props.theme.grey500};
    padding: 1em 1.5rem;
    margin: 1rem 0;
    font-size: ${props => props.theme.fontSize};
    border-radius: ${props => props.theme.borderRadius};
    :focus {
        border: 2px solid ${props => props.theme.grey400};
        outline: none;
    }
`;
