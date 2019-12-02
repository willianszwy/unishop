import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import { Link, withRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles({
    stickToBottom: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000
    }
});

const SellBar = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.active);
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
                label="Home"
                icon={<HomeIcon />}
                component={Link}
                to="/"
            />
            <BottomNavigationAction
                label="Vendas"
                icon={<MonetizationOnIcon />}
                component={Link}
                to="/sells"
            />

            <BottomNavigationAction
                label="Produtos"
                icon={<AppsIcon />}
                component={Link}
                to="/products"
            />

            <BottomNavigationAction
                label="Configuração"
                icon={<SettingsIcon />}
                component={Link}
                to="/config"
            />
        </BottomNavigation>
    );
};

export default withRouter(SellBar);
