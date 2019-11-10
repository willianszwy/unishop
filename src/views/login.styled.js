import styled from "styled-components";
import logo from "../assets/logo.svg";

export const StyledLogin = styled.div`
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
    img {
        display: block;
        width: 50%;
        margin: 20px auto;
    }

    .logo {
        height: 80px;
        background: linear-gradient(
            90deg,
            rgb(160, 222, 219),
            rgb(3, 165, 209)
        );
        -webkit-mask: url(${logo}) no-repeat center;
        mask: url(${logo}) no-repeat center;
    }

    a,
    a:visited,
    a:hover,
    a:active {
        color: inherit;
    }
`;
