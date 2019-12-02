import React from "react";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { isAuthenticated } from "../services/auth";
import { Link } from "react-router-dom";
import StyledButton from "../components/Button";
import TextField from "@material-ui/core/TextField";
import { ErrorShow } from "../components";
import { Card, CardContent, IconButton, Container } from "@material-ui/core";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "10px"
    },
    img: {
        display: "block",
        width: "50%",
        margin: "20px auto"
    },
    button: {
        marginBottom: "8px"
    }
}));

const Register = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const classes = useStyles();
    const registerHandle = inputs => {
        setLoading(true);
        const { usuario_nome, usuario_email, usuario_senha } = inputs;
        if (validateForm()) {
            api.post("/usuarios", {
                usuario_nome,
                usuario_email,
                usuario_senha
            })
                .then(response => {
                    setLoading(false);
                    props.history.push("/");
                })
                .catch(error => {
                    setLoading(false);
                    if (error.response) {
                        setErrors(error.response.data.msg);
                    } else if (error.request) {
                        setErrors("Erro ao conectar o servidor");
                    } else {
                        setErrors(error);
                    }
                });
        } else {
            setLoading(false);
            setErrors("Senhas digitadas não conferem!");
        }
    };

    const [loading, setLoading] = React.useState(false);

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
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            <IconButton
                                size="small"
                                component={Link}
                                to="/login"
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>
                        {errors && <ErrorShow>{errors}</ErrorShow>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    type="text"
                                    name="usuario_nome"
                                    label="Nome Completo"
                                    onChange={handleInputChange}
                                    value={inputs.usuario_nome}
                                    margin="dense"
                                    variant="filled"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    type="email"
                                    name="usuario_email"
                                    label="Email"
                                    onChange={handleInputChange}
                                    value={inputs.usuario_email}
                                    margin="dense"
                                    variant="filled"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    label="Senha"
                                    name="usuario_senha"
                                    onChange={handleInputChange}
                                    value={inputs.usuario_senha}
                                    fullWidth
                                    margin="dense"
                                    variant="filled"
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    name="usuario_senha_confirmacao"
                                    onChange={handleInputChange}
                                    value={inputs.usuario_senha_confirmacao}
                                    fullWidth
                                    label="Confirmar Senha"
                                    margin="dense"
                                    variant="filled"
                                    required
                                />
                            </div>
                            <StyledButton type="submit" primary fullWidth>
                                Cadastrar
                            </StyledButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
