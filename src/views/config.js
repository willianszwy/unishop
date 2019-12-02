import React from "react";
import Container from "@material-ui/core/Container";
import SellBar from "../components/SellBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { getUser } from "../services/auth";
import api from "../services/api";
import Loader from "../components/Loader";

import StyledButton from "../components/Button";
import {
    FormGroup,
    FormControlLabel,
    Switch,
    FormLabel
} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        marginTop: "10px"
    }
});

const Config = props => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);

    const user = getUser();
    const id = user ? user.usuario_id : "";

    const [inputs, setInputs] = React.useState({
        usuario_status_venda: 0,
        usuario_status_entrega: 0,
        usuario_status_local: 0,
        usuario_local_atend: ""
    });

    React.useEffect(() => {
        setLoading(true);
        api.get(`/usuarios/${id}/config`).then(response => {
            setInputs(response.data);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStatusChange = name => event => {
        setInputs({ ...inputs, [name]: event.target.checked ? 1 : 0 });
    };

    const handleChange = event => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        if (event) {
            event.preventDefault();
        }

        setLoading(true);
        api.put(`/usuarios/${id}/config`, inputs)
            .then(() => {
                setLoading(false);
                props.history.push("/sell");
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel component="legend">
                                    Online para vendas
                                </FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={
                                                parseInt(
                                                    inputs.usuario_status_venda
                                                ) === 1
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleStatusChange(
                                                "usuario_status_venda"
                                            )}
                                            value="checked"
                                        />
                                    }
                                    label={
                                        parseInt(
                                            inputs.usuario_status_venda
                                        ) === 1
                                            ? "On"
                                            : "Off"
                                    }
                                />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <FormLabel component="legend">
                                    Realizar entrega
                                </FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={
                                                parseInt(
                                                    inputs.usuario_status_entrega
                                                ) === 1
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleStatusChange(
                                                "usuario_status_entrega"
                                            )}
                                            value="checked"
                                        />
                                    }
                                    label={
                                        parseInt(
                                            inputs.usuario_status_entrega
                                        ) === 1
                                            ? "On"
                                            : "Off"
                                    }
                                />
                            </FormGroup>
                            <br />
                            <div>
                                <FormGroup>
                                    <FormLabel component="legend">
                                        Vender em local fixo
                                    </FormLabel>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={
                                                    parseInt(
                                                        inputs.usuario_status_local
                                                    ) === 1
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleStatusChange(
                                                    "usuario_status_local"
                                                )}
                                                value="checked1"
                                            />
                                        }
                                        label={
                                            parseInt(
                                                inputs.usuario_status_local
                                            ) === 1
                                                ? "On"
                                                : "Off"
                                        }
                                    />
                                </FormGroup>
                            </div>

                            <div>
                                <TextField
                                    disabled={
                                        parseInt(
                                            inputs.usuario_status_local
                                        ) === 1
                                            ? false
                                            : true
                                    }
                                    multiline
                                    rows="3"
                                    name="usuario_local_atend"
                                    label="Local atendimento fixo"
                                    onChange={handleChange}
                                    value={inputs.usuario_local_atend}
                                    margin="dense"
                                    variant="filled"
                                    required
                                    fullWidth
                                />
                            </div>

                            <StyledButton type="submit" fullWidth>
                                Salvar
                            </StyledButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <SellBar active={3} />
        </div>
    );
};

export default Config;
