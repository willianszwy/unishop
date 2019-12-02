import React from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import AppBar from "../components/AppBar";
import Loader from "../components/Loader";
import StyledButton from "../components/Button";
import { makeStyles } from "@material-ui/core/styles";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import RoomIcon from "@material-ui/icons/Room";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    CardHeader,
    Avatar,
    Chip
} from "@material-ui/core";
import AlertDialog from "../components/AlertDialog";
import Quantity from "../components/Quantity";

import { Rating } from "@material-ui/lab";

import getImageURL from "../helpers";
import api from "../services/api";

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "10px",
        marginBottom: "80px"
    },
    media: {
        height: 200
    },
    avatar: {
        width: 60,
        height: 60
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

const Product = props => {
    const classes = useStyles();
    const { id } = useParams();
    const initialState = {
        produto_nome: "",
        produto_descricao: "",
        produto_foto: "",
        produto_valor: 0
    };
    const [loading, setLoading] = React.useState(false);
    const [product, setProduct] = React.useState(initialState);
    const [vendedor, setVendedor] = React.useState({
        usuario_email: "",
        usuario_foto: "",
        usuario_nome: ""
    });
    const [entrega, setEntrega] = React.useState({
        usuario_status_entrega: 0,
        usuario_status_local: 0
    });

    const [quantidade, setQuantidade] = React.useState(1);

    const [comprarConfirma, setComprarConfirma] = React.useState(false);

    const handleQtde = value => {
        setQuantidade(value);
    };

    React.useEffect(() => {
        setLoading(true);
        api.get(`/produtos/${id}`).then(response => {
            setProduct(response.data);
            api.get(`/usuarios/${response.data.produto_usuario_id}`).then(
                res => {
                    setVendedor(res.data);
                    api.get(
                        `/usuarios/${response.data.produto_usuario_id}/config`
                    ).then(response => {
                        setEntrega(response.data);
                        setLoading(false);
                    });
                }
            );
        });
    }, [id]);

    const showChip = params => {
        const value = parseInt(params) === 1 ? true : false;
        return {
            color: value ? "secondary" : "default",
            disabled: !value
        };
    };

    const showDialog = () => {
        setComprarConfirma(true);
    };

    const comprar = () => {
        setLoading(true);
        api.post("/pedidos", {
            pedido_produto_id: product.produto_id,
            pedido_vendedor_id: product.produto_usuario_id,
            pedido_qtde: quantidade,
            pedido_retirar: false,
            pedido_entrega_local: false
        })
            .then(response => {
                setLoading(false);
                props.history.push("/buy");
            })
            .catch(error => {});
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                src={getImageURL(vendedor.usuario_foto)}
                                className={classes.avatar}
                            />
                        }
                        title={vendedor.usuario_nome}
                        subheader={vendedor.usuario_email}
                    />
                    <CardMedia
                        className={classes.media}
                        image={getImageURL(product.produto_foto)}
                        title={product.produto_nome}
                    />
                    <CardContent>
                        <div className={classes.root}>
                            <div className={classes.root}>
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Entrega"
                                    icon={<LocalShippingIcon />}
                                    {...showChip(
                                        entrega.usuario_status_entrega
                                    )}
                                ></Chip>
                                <Chip
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    label="Local Fixo"
                                    icon={<RoomIcon />}
                                    {...showChip(entrega.usuario_status_local)}
                                ></Chip>
                            </div>
                            <div>
                                <Rating
                                    size="small"
                                    name="half-rating"
                                    precision={0.5}
                                    value={product.avaliacao}
                                    readOnly
                                />
                            </div>
                        </div>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {product.produto_nome}
                        </Typography>

                        <Typography variant="body2" component="p">
                            {product.produto_descricao}
                        </Typography>
                        <Typography variant="h4" component="h1" align="right">
                            {product.produto_valor.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Quantity onChange={handleQtde} />
                    </CardActions>
                    <CardActions>
                        <StyledButton
                            size="small"
                            onClick={showDialog}
                            fullWidth
                        >
                            Comprar
                        </StyledButton>
                    </CardActions>
                </Card>
            </Container>
            <AppBar active={0} />
            <AlertDialog
                open={comprarConfirma}
                title="Confirmação"
                content="Deseja prosseguir com sua compra?"
                onAccept={() => comprar()}
                onCancel={() => setComprarConfirma(false)}
            />
        </div>
    );
};

export default Product;
