import styled from "styled-components";

export const StyledHome = styled.div`
    border: 2px solid ${props => props.theme.gray700};
    padding: 2rem;
    margin: 50px auto;
    max-width: 600px;
    border-radius: 10px;
    background: #fff;
    color: black;

    @media (max-width: 765px) {
        margin: 50px 10px;
    }
`;
