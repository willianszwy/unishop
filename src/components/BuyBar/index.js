import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import { Link, withRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
    stickToBottom: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000
    }
});

const BuyBar = props => {
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
                label="finalizar"
                icon={<ShoppingCartIcon />}
                component={Link}
                to="/buy"
            />
            <BottomNavigationAction
                label="Histórico"
                icon={<HistoryIcon />}
                component={Link}
                to="/history"
            />
        </BottomNavigation>
    );
};

export default withRouter(BuyBar);
