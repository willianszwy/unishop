import React from "react";
import Container from "@material-ui/core/Container";
import SellBar from "../components/SellBar";
import Pedido from "../components/Pedido";
import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Avatar,
    TextField
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Loader from "../components/Loader";
import api from "../services/api";

import StyledButton from "../components/Button";
import getImageURL from "../helpers";
import AlertDialog from "../components/AlertDialog";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "10px",
        marginBottom: "80px"
    },
    avatar: {
        width: 60,
        height: 60
    }
}));

const Sell = props => {
    const classes = useStyles();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const initialState = {
        pedido_avaliacao: 0,
        pedido_data: "",
        pedido_entrega_local: "",
        pedido_id: 0,
        pedido_produto_descricao: "",
        pedido_produto_id: 0,
        pedido_produto_nome: "",
        pedido_qtde: 0,
        pedido_retirar: 0,
        pedido_status: 0,
        pedido_status_entrega: 0,
        pedido_usuario_id: 0,
        pedido_valor: ""
    };

    const [loading, setLoading] = React.useState(false);
    const [entregaConfirma, setEntregaConfirma] = React.useState(false);
    const [venda, setVenda] = React.useState(initialState);
    const [comprador, setComprador] = React.useState({
        usuario_email: "",
        usuario_foto: "",
        usuario_nome: ""
    });
    React.useEffect(() => {
        setLoading(true);
        api.get(`/pedidos/${id}`).then(response => {
            setVenda(response.data);
            api.get(`/usuarios/${response.data.pedido_usuario_id}`).then(
                response => {
                    setComprador(response.data);
                }
            );
            setLoading(false);
        });
    }, [id]);

    const entregar = () => {
        setLoading(true);
        api.put(`/pedidos/${venda.pedido_id}/entrega`, {
            pedido_status_entrega: 1
        }).then(response => {
            enqueueSnackbar("Pedido Entregue!", {
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                variant: "success",
                persist: false
            });
            props.history.push("/sells");
        });
        setEntregaConfirma(false);
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar
                                className={classes.avatar}
                                aria-label="recipe"
                                src={getImageURL(comprador.usuario_foto)}
                            />
                        }
                        title={comprador.usuario_nome}
                        subheader={comprador.usuario_email}
                    />
                    <CardContent>
                        <Pedido pedido={venda} />

                        <TextField
                            InputProps={{
                                readOnly: true
                            }}
                            multiline
                            rows="3"
                            name="usuario_local_atend"
                            label={
                                parseInt(venda.pedido_retirar) === 0
                                    ? "Entregar:"
                                    : "Retirar"
                            }
                            value={venda.pedido_entrega_local}
                            margin="dense"
                            variant="outlined"
                            // required
                            fullWidth
                        />
                    </CardContent>
                    <CardActions>
                        {parseInt(venda.pedido_status_entrega) === 0 ? (
                            <StyledButton
                                size="small"
                                onClick={() => setEntregaConfirma(true)}
                                fullWidth
                            >
                                Entregue
                            </StyledButton>
                        ) : (
                            ""
                        )}
                    </CardActions>
                </Card>
            </Container>

            <SellBar active={1} />

            <AlertDialog
                open={entregaConfirma}
                title="Confirmar entrega"
                content="Deseja realmente confirmar a entrega?"
                onAccept={() => entregar()}
                onCancel={() => setEntregaConfirma(false)}
            />
        </div>
    );
};

export default Sell;
