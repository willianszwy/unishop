import React from "react";
import Container from "@material-ui/core/Container";
import SellBar from "../components/SellBar";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import api from "../services/api";
import { getUser } from "../services/auth";
import { Link as RLink } from "react-router-dom";
import Loader from "../components/Loader";
import getImageURL from "../helpers";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "80px",
        backgroundColor: theme.palette.background.paper
    },
    fab: {
        position: "fixed",
        bottom: 80,
        right: 20
    }
}));

const productList = products =>
    products.map(product => (
        <div key={product.produto_id}>
            <ListItem
                button
                component={RLink}
                to={`/editProduct/${product.produto_id}`}
            >
                <ListItemAvatar>
                    <Avatar
                        variant="rounded"
                        src={getImageURL(product.produto_foto)}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={product.produto_nome}
                    secondary={product.produto_descricao}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        component={RLink}
                        to={`/editProduct/${product.produto_id}`}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Divider />
        </div>
    ));

const ProductList = () => {
    const [itens, setItens] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const user = getUser();
        const id = user ? user.usuario_id : "";
        setLoading(true);
        api.get(`/usuarios/${id}/produtos`)
            .then(response => {
                setItens(productList(response.data));
                setLoading(false);
            })
            .catch(error => {});
    }, []);
    const classes = useStyles();
    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm" className={classes.container}>
                <List className={classes.root}>{itens}</List>
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                    component={RLink}
                    to="createProduct"
                >
                    <AddIcon />
                </Fab>
            </Container>
            <SellBar active={2} />
        </div>
    );
};

export default ProductList;
