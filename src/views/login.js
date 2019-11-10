import React from "react";
import logo from "../assets/logo.svg";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { login, isAuthenticated } from "../services/auth";
import { StyledLogin } from "./login.styled";
import { Button, Input, ErrorShow } from "../components";
import { Link } from "react-router-dom";

const Login = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const loginHandle = async inputs => {
        setErrors("");
        try {
            const { username, password } = inputs;
            const response = await api.post("/login", {
                username: username,
                password: password
            });

            login(response.data);

            props.history.push("/");
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.msg);
            } else if (error.request) {
                setErrors("Erro ao conectar o servidor");
            } else {
                setErrors(error);
            }
        }
    };

    const initialState = { username: "", password: "" };
    const {
        inputs,
        handleInputChange,
        handleSubmit,
        errors,
        setErrors
    } = useForm(loginHandle, initialState);
    return (
        <StyledLogin>
            <img src={logo} className="App-logo" alt="logo" />
            <form onSubmit={handleSubmit}>
                {errors && <ErrorShow>{errors}</ErrorShow>}
                <div>
                    <Input
                        type="email"
                        name="username"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={inputs.username}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        onChange={handleInputChange}
                        value={inputs.password}
                        required
                    />
                </div>
                <Button type="submit" primary>
                    Entrar
                </Button>
            </form>
            <Link to="/recovery">Esqueci a senha</Link>
            <Button as={Link} to="register">
                Registre-se
            </Button>
        </StyledLogin>
    );
};

export default Login;
