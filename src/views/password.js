import React from "react";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { isAuthenticated } from "../services/auth";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FilledInput from "@material-ui/core/FilledInput";
import StyledButton from "../components/Button";
import { ErrorShow } from "../components";
import { useParams } from "react-router-dom";
import { Card, CardContent, Container } from "@material-ui/core";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";

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

const Password = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const classes = useStyles();
    const { hash } = useParams();
    const loginHandle = inputs => {
        setErrors("");
        setLoading(true);
        const { password } = inputs;
        api.put(`/recuperar/${hash}`, {
            password: password
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
                    setErrors("Erro na conexão ao servidor");
                } else {
                    setErrors(error);
                }
            });
    };

    const [loading, setLoading] = React.useState(false);

    const initialState = { password: "", password_repeat: "" };
    const {
        inputs,
        handleInputChange,
        handleSubmit,
        errors,
        setErrors
    } = useForm(loginHandle, initialState);

    const [values, setValues] = React.useState({
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            {errors && <ErrorShow>{errors}</ErrorShow>}

                            <div>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                    required
                                >
                                    <InputLabel htmlFor="filled-adornment-password">
                                        Senha
                                    </InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        name="password"
                                        type={
                                            values.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={inputs.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {values.showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                    required
                                    margin="dense"
                                >
                                    <InputLabel htmlFor="filled-adornment-password-repeat">
                                        Repita a Senha
                                    </InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password-repeat"
                                        name="password_repeat"
                                        type={
                                            values.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={inputs.password_repeat}
                                        onChange={handleInputChange}
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {values.showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <StyledButton
                                    type="submit"
                                    size="large"
                                    color="primary"
                                    fullWidth
                                >
                                    Alterar
                                </StyledButton>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Password;
