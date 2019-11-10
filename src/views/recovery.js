import React from "react";
import { StyledRecovery } from "./recovery.styled";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { isAuthenticated } from "../services/auth";
import { Button, Input } from "../components";
import { Link } from "react-router-dom";

const Recovery = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const recoveryHandle = async inputs => {
        try {
            const { email } = inputs;
            await api.post("/recuperar", {
                email
            });
            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    };
    const initialState = { email: "" };
    const { inputs, handleInputChange, handleSubmit } = useForm(
        recoveryHandle,
        initialState
    );
    return (
        <StyledRecovery>
            <div>
                <Link to="/login">Voltar</Link>
            </div>
            <form onSubmit={handleSubmit}>
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

                <Button type="submit">Enviar</Button>
            </form>
        </StyledRecovery>
    );
};

export default Recovery;
