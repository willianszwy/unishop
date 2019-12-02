import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link as RLink } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const Confirm = props => {
    if (!isAuthenticated()) {
        props.history.push("/login");
    }
    return (
        <div>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmação de E-Mail"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Enviamos um e-mail para sua caixa de entrada! Por favor
                        confirme para poder utilizar o sistema.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        component={RLink}
                        to={`/logout`}
                        color="primary"
                        autoFocus
                    >
                        Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Confirm;
