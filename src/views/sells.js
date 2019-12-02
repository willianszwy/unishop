import React from "react";
import Container from "@material-ui/core/Container";
import SellBar from "../components/SellBar";
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

const sellsMap = (sells, classes) =>
    sells.map(sell => (
        <div key={sell.pedido_id}>
            <ListItem
                button
                component={RLink}
                to={`/sell/${sell.pedido_id}`}
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
                                parseInt(sell.pedido_status_entrega) === 0
                                    ? "secondary"
                                    : "disabled"
                            }
                        />
                    ) : (
                        <RoomIcon
                            color={
                                parseInt(sell.pedido_status_entrega) === 0
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
                                Quantidade: {sell.pedido_qtde} Valor:{" "}
                                {(
                                    sell.pedido_qtde * sell.pedido_valor
                                ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        component={RLink}
                        to={`/sell/${sell.pedido_id}`}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Divider />
        </div>
    ));

const Sells = props => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [vendas, setVendas] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        const user = getUser();
        const id = user ? user.usuario_id : "";
        api.get(`/usuarios/${id}/vendas`).then(response => {
            setVendas(sellsMap(response.data, classes));
            setLoading(false);
        });
    }, [classes]);
    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <List className={classes.root}>{vendas}</List>
            </Container>

            <SellBar active={1} />
        </div>
    );
};

export default Sells;
