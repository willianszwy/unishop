import React from "react";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { isAuthenticated } from "../services/auth";
import { StyledRegister } from "./register.styled";
import { Button, Input, ErrorShow } from "../components";
import { Link } from "react-router-dom";

const Register = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const registerHandle = async inputs => {
        try {
            const { usuario_nome, usuario_email, usuario_senha } = inputs;
            if (validateForm()) {
                await api.post("/usuarios", {
                    usuario_nome,
                    usuario_email,
                    usuario_senha
                });
                props.history.push("/");
            } else {
                setErrors("Senhas digitadas não conferem!");
            }
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
    const validateForm = () => {
        return inputs.usuario_senha === inputs.usuario_senha_confirmacao;
    };
    const initialState = {
        usuario_nome: "",
        usuario_email: "",
        usuario_senha: "",
        usuario_senha_confirmacao: ""
    };
    const {
        inputs,
        handleInputChange,
        handleSubmit,
        errors,
        setErrors
    } = useForm(registerHandle, initialState);
    return (
        <StyledRegister>
            <div>
                <Link to="/login">Voltar</Link>
            </div>
            {errors && <ErrorShow>{errors}</ErrorShow>}
            <form onSubmit={handleSubmit}>
                <div>
                    <Input
                        type="text"
                        name="usuario_nome"
                        placeholder="Nome Completo"
                        onChange={handleInputChange}
                        value={inputs.usuario_nome}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="email"
                        name="usuario_email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={inputs.usuario_email}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="usuario_senha"
                        onChange={handleInputChange}
                        value={inputs.usuario_senha}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Confirmar Senha"
                        name="usuario_senha_confirmacao"
                        onChange={handleInputChange}
                        value={inputs.usuario_senha_confirmacao}
                        required
                    />
                </div>
                <Button type="submit">Cadastrar</Button>
            </form>
        </StyledRegister>
    );
};

export default Register;
