import React from "react";
import useForm from "../hooks/formHooks";
import api from "../services/api";
import { isAuthenticated } from "../services/auth";
import { Link } from "react-router-dom";
import StyledButton from "../components/Button";
import TextField from "@material-ui/core/TextField";
import { Card, CardContent, Container, IconButton } from "@material-ui/core";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "10px"
    }
}));

const Recovery = props => {
    if (isAuthenticated()) {
        props.history.push("/");
    }
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const recoveryHandle = inputs => {
        setLoading(true);
        const { email } = inputs;
        api.post("/recuperar", {
            email
        })
            .then(response => {
                setLoading(false);
                props.history.push("/");
            })
            .catch(err => {
                setLoading(false);
            });
    };
    const initialState = { email: "" };
    const { inputs, handleInputChange, handleSubmit } = useForm(
        recoveryHandle,
        initialState
    );
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
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    type="email"
                                    name="email"
                                    label="Email"
                                    onChange={handleInputChange}
                                    value={inputs.email}
                                    margin="normal"
                                    variant="filled"
                                    fullWidth
                                    required
                                />
                            </div>

                            <StyledButton type="submit" fullWidth>
                                Enviar
                            </StyledButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Recovery;
