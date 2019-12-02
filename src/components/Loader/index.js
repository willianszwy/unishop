import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        top: 0,
        zIndex: 9999,
        width: "100%"
    }
});

const Loader = props => {
    const classes = useStyles();
    return (
        <div>
            {props.show && (
                <LinearProgress className={classes.root} color="secondary" />
            )}
        </div>
    );
};

export default Loader;
