import React from "react";
import Container from "@material-ui/core/Container";
import BuyBar from "../components/BuyBar";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Typography,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../components/Loader";
import api from "../services/api";
import { Link as RLink } from "react-router-dom";
import { getUser } from "../services/auth";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "80px",
        backgroundColor: theme.palette.background.paper
    },
    disabled: {
        backgroundColor: "#eee"
    }
}));

const History = props => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [compras, setCompras] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        const user = getUser();
        const id = user ? user.usuario_id : "";
        api.get(`/usuarios/${id}/compras`).then(response => {
            setCompras(response.data);
            setLoading(false);
        });
    }, []);

    const updateRating = (id, index) => (event, newValue) => {
        setLoading(true);

        api.put(`/pedidos/${id}/avaliar`, {
            pedido_avaliacao: newValue
        }).then(response => {
            setLoading(false);
            const _compras = [...compras];
            _compras[index] = {
                ..._compras[index],
                pedido_avaliacao: newValue
            };
            setCompras(_compras);
        });
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <List className={classes.root}>
                    {compras.map((sell, index) => (
                        <div key={sell.pedido_id}>
                            <ListItem
                                className={
                                    parseInt(sell.pedido_status_entrega) === 0
                                        ? ""
                                        : classes.disabled
                                }
                            >
                                <ListItemIcon>
                                    {parseInt(sell.pedido_retirar) === 0 ? (
                                        <LocalShippingIcon
                                            color={
                                                parseInt(
                                                    sell.pedido_status_entrega
                                                ) === 0
                                                    ? "secondary"
                                                    : "disabled"
                                            }
                                        />
                                    ) : (
                                        <RoomIcon
                                            color={
                                                parseInt(
                                                    sell.pedido_status_entrega
                                                ) === 0
                                                    ? "primary"
                                                    : "disabled"
                                            }
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={sell.pedido_produto_nome}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textSecondary"
                                            >
                                                Quantidade: {sell.pedido_qtde}{" "}
                                                Valor:{" "}
                                                {(
                                                    sell.pedido_qtde *
                                                    sell.pedido_valor
                                                ).toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL"
                                                })}
                                            </Typography>
                                            <br />
                                            {parseInt(
                                                sell.pedido_status_entrega
                                            ) === 1 ? (
                                                <Rating
                                                    name={`avaliacao-${sell.pedido_id}`}
                                                    readOnly={
                                                        sell.pedido_avaliacao ===
                                                        null
                                                            ? false
                                                            : true
                                                    }
                                                    value={
                                                        sell.pedido_avaliacao
                                                    }
                                                    onChange={updateRating(
                                                        sell.pedido_id,
                                                        index
                                                    )}
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        component={RLink}
                                        to={`/purchase/${sell.pedido_id}`}
                                    >
                                        <NavigateNextIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Divider />
                        </div>
                    ))}
                </List>
            </Container>

            <BuyBar active={2} />
        </div>
    );
};

export default History;
