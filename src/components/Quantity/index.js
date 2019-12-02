import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField, Grid } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

const Quantity = ({ onChange }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState(1);
    const incQuantity = () => {
        setQuantity(quantity + 1);
        onChange(quantity + 1);
    };
    const decQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onChange(quantity - 1);
        }
    };

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={2}>
                    <IconButton
                        color="secondary"
                        aria-label="sub"
                        onClick={decQuantity}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Quantidade"
                        size="small"
                        value={quantity}
                        className={classes.textField}
                        margin="dense"
                        InputProps={{
                            readOnly: true
                        }}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        color="secondary"
                        aria-label="add"
                        onClick={incQuantity}
                    >
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default Quantity;
