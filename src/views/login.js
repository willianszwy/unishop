import React from "react";
import logo from "../assets/logo.svg";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { login, isAuthenticated } from "../services/auth";
import { Link as RLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FilledInput from "@material-ui/core/FilledInput";
import StyledButton from "../components/Button";
import { ErrorShow } from "../components";
import Link from "@material-ui/core/Link";
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

const Login = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const loginHandle = inputs => {
        setErrors("");
        setLoading(true);
        const { username, password } = inputs;
        api.post("/login", {
            username: username,
            password: password
        })
            .then(response => {
                setLoading(false);
                login(response.data);

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

    const initialState = { username: "", password: "" };
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
                        <img src={logo} className={classes.img} alt="logo" />
                        <form onSubmit={handleSubmit}>
                            {errors && <ErrorShow>{errors}</ErrorShow>}
                            <div>
                                <TextField
                                    type="email"
                                    name="username"
                                    onChange={handleInputChange}
                                    value={inputs.username}
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    variant="filled"
                                    required
                                />
                            </div>
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
                                    className={classes.button}
                                >
                                    Entrar
                                </StyledButton>
                            </div>
                        </form>

                        <Link component={RLink} to="/recovery">
                            Esqueci a senha
                        </Link>
                        <Button component={RLink} to="register" fullWidth>
                            Registre-se
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
