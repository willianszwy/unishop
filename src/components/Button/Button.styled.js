import styled, { css } from "styled-components";

export const StyledButton = styled.button`
    display: block;

    padding: 1rem 0;
    margin: 0.5rem 0;
    width: 100%;
    background: ${props => props.theme.primary};
    font-size: ${props => props.theme.fontSize};
    border-radius: ${props => props.theme.borderRadius};
    text-align: center;
    text-decoration: none;
    color: white !important;
    border: none;
    cursor: pointer;
    :hover {
        text-decoration: none !important;
        background: ${props => props.theme.grey400};
    }

    ${props =>
        props.primary &&
        css`
            background: ${props => props.theme.grey800};
            /* background: linear-gradient(
                    145deg,
                    rgba(232, 87, 237, 0.15) 0%,
                    rgba(109, 137, 69, 0.15) 100%
                ),
                linear-gradient(75deg, rgb(33, 138, 184), rgb(0, 241, 181)); */
            background: linear-gradient(
                90deg,
                rgb(252, 108, 53),
                rgb(170, 18, 159)
            );
            :hover,
            :active {
                background: #d13b62;
            }
            color: white;
        `}

    ${props =>
        props.secondary &&
        css`
            background: ${props => props.theme.grey500};
            color: white;
        `}
`;
