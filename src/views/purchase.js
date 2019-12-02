import React from "react";
import Container from "@material-ui/core/Container";
import BuyBar from "../components/BuyBar";
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
import getImageURL from "../helpers";

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

const Purchase = props => {
    const classes = useStyles();
    const { id } = useParams();

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

    const [venda, setVenda] = React.useState(initialState);
    const [vendedor, setVendedor] = React.useState({
        usuario_email: "",
        usuario_foto: "",
        usuario_nome: ""
    });
    React.useEffect(() => {
        setLoading(true);
        api.get(`/pedidos/${id}`).then(response => {
            setVenda(response.data);
            api.get(`/usuarios/${response.data.pedido_vendedor_id}`).then(
                response => {
                    setVendedor(response.data);
                }
            );
            setLoading(false);
        });
    }, [id]);

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
                                src={getImageURL(vendedor.usuario_foto)}
                            />
                        }
                        title={vendedor.usuario_nome}
                        subheader={vendedor.usuario_email}
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
                    <CardActions></CardActions>
                </Card>
            </Container>

            <BuyBar active={2} />
        </div>
    );
};

export default Purchase;
