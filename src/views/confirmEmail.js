import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link as RLink } from "react-router-dom";
import api from "../services/api";
import { useParams } from "react-router-dom";

const ConfirmEmail = props => {
    let { hash } = useParams();
    React.useEffect(() => {
        api.put(`/confirmar/${hash}`)
            .then(response => {
                //
            })
            .catch(error => {
                //
            });
    }, [hash]);
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
                        Obrigado por confirmar seu E-mail!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        component={RLink}
                        to={`/logout`}
                        color="primary"
                        autoFocus
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmEmail;
