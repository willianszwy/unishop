import React from "react";
import Container from "@material-ui/core/Container";
import BuyBar from "../components/BuyBar";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@material-ui/core";

import api from "../services/api";
import { getUser } from "../services/auth";
import StyledButton from "../components/Button";
import AlertDialog from "../components/AlertDialog";
import Loader from "../components/Loader";
import Pedido from "../components/Pedido";
import Entrega from "../components/Entrega";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "10px",
        marginBottom: "80px"
    },
    media: {
        height: 200
    },
    avatar: {
        // backgroundColor: "#ff0000"
    },
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.2)
        }
    }
}));

const convertePedido = ({
    produto_nome,
    produto_descricao,
    produto_valor,
    pedido_qtde,
    pedido_id
}) => {
    return {
        pedido_produto_nome: produto_nome,
        pedido_produto_descricao: produto_descricao,
        pedido_valor: produto_valor,
        pedido_qtde,
        pedido_id
    };
};

const Buy = props => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const initialState = {
        usuario_nome: "",
        pedido_data: "",
        pedido_entrega_local: "",
        pedido_id: "",
        pedido_produto_id: "",
        pedido_qtde: "",
        pedido_retirar: "",
        pedido_status: "",
        pedido_status_entrega: "",
        produto_descricao: "",
        produto_id: "",
        produto_nome: "",
        produto_foto: "",
        produto_valor: 0,
        produto_usuario_id: 0,
        usuario_status_venda: 0,
        usuario_status_entrega: 0,
        usuario_status_local: 0,
        usuario_local_atend: ""
    };

    const [loading, setLoading] = React.useState(false);
    const [pedido, setPedido] = React.useState(initialState);
    const [entrega, setEntrega] = React.useState({
        pedido_retirar: 0,
        pedido_entrega_local: ""
    });
    const [finalizar, setFinalizar] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        const user = getUser();
        const id = user ? user.usuario_id : "";
        api.get(`/usuarios/${id}/pedido`)
            .then(response => {
                setPedido(response.data);
                setLoading(false);
            })
            .catch(error => {
                enqueueSnackbar(error.response.data.msg, {
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center"
                    },
                    variant: "error",
                    persist: false
                });
                props.history.push("/history");
            });
    }, [props.history, enqueueSnackbar]);

    const getVendedorConfig = ({
        usuario_status_venda,
        usuario_status_entrega,
        usuario_status_local,
        usuario_local_atend
    }) => {
        return {
            usuario_status_venda,
            usuario_status_entrega,
            usuario_status_local,
            usuario_local_atend
        };
    };

    const handleSubmit = event => {
        if (event) {
            event.preventDefault();
        }
        setFinalizar(true);
    };

    const handleDelivery = (selected, value) => {
        setEntrega({
            pedido_retirar: selected === "f",
            pedido_entrega_local: value
        });
    };

    const cancelarPedido = () => {
        setLoading(true);
        api.delete(`/pedidos/${pedido.pedido_id}`).then(response => {
            enqueueSnackbar("Pedido cancelado!", {
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                variant: "success",
                persist: false
            });
            props.history.push("/");
        });
    };

    const finalizarCompra = () => {
        setLoading(true);
        api.put(`/pedidos/${pedido.pedido_id}`, {
            ...entrega
        })
            .then(response => {
                setLoading(false);
                setFinalizar(false);
                enqueueSnackbar(
                    "Pedido Feito! " +
                        (!entrega.pedido_retirar
                            ? " Aguarde a entrega!"
                            : "Dirija-se ao local informado!"),
                    {
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center"
                        },
                        variant: "success",
                        persist: false
                    }
                );
                props.history.push("/");
            })
            .catch(error => {
                setFinalizar(false);
                setLoading(false);
                enqueueSnackbar(error.response.data.msg, {
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center"
                    },
                    variant: "error",
                    persist: false
                });
            });
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                align="center"
                                component="h2"
                                gutterBottom
                            >
                                Finalize sua Compra
                            </Typography>

                            <Pedido pedido={convertePedido(pedido)} />

                            <Entrega
                                vendedor={getVendedorConfig(pedido)}
                                onChange={handleDelivery}
                            />
                        </CardContent>
                        <CardActions>
                            <StyledButton type="submit" fullWidth>
                                Finalizar Compra
                            </StyledButton>
                        </CardActions>
                        <CardActions>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={cancelarPedido}
                                fullWidth
                            >
                                Cancelar
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Container>
            <BuyBar active={1} />
            <AlertDialog
                open={finalizar}
                title="Confirmação"
                content="Deseja finalizar sua compra?"
                onAccept={() => finalizarCompra()}
                onCancel={() => setFinalizar(false)}
            />
        </div>
    );
};

export default Buy;
