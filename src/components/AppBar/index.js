import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SearchIcon from "@material-ui/icons/Search";
import { Link, withRouter } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { getUser } from "../../services/auth";
import api from "../../services/api";

const useStyles = makeStyles({
    stickToBottom: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000
    }
});

const AppBar = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.active);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const user = getUser();
        const id = user ? user.usuario_id : "";
        api.get(`/usuarios/${id}/vendas/total`).then(response => {
            setCount(parseInt(response.data.total_vendas));
        });
    }, []);

    return (
        <BottomNavigation
            className={classes.stickToBottom}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction
                label="Buscar"
                icon={<SearchIcon />}
                component={Link}
                to="/"
            />
            <BottomNavigationAction
                label="Vender"
                icon={
                    <Badge badgeContent={count} max={5} color="secondary">
                        <MonetizationOnIcon />
                    </Badge>
                }
                component={Link}
                to="/sells"
            />
            <BottomNavigationAction
                label="Comprar"
                icon={<ShoppingCartIcon />}
                component={Link}
                to="/history"
            />
            <BottomNavigationAction
                label="Perfil"
                icon={<AccountCircleIcon />}
                component={Link}
                to="/profile"
            />
        </BottomNavigation>
    );
};

export default withRouter(AppBar);
