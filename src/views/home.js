import React from "react";
import { StyledHome } from "./home.styled";
import { getUser } from "../services/auth";

const Home = () => {
    const user = getUser();
    return (
        <StyledHome>
            <h1>Hello {user.usuario_nome}!</h1>
        </StyledHome>
    );
};

export default Home;
