import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        overflowX: "auto"
    }
}));

const Pedido = ({ pedido }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Table aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Detalhes Pedido № {pedido.pedido_id}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pedido.pedido_data === undefined ? null : (
                        <TableRow>
                            <TableCell>
                                <b>Data:</b>
                            </TableCell>
                            <TableCell align="left">
                                {new Date(
                                    pedido.pedido_data
                                ).toLocaleString("pt-BR", { timeZone: "UTC" })}
                            </TableCell>
                        </TableRow>
                    )}
                    {pedido.pedido_data_entrega ? (
                        <TableRow>
                            <TableCell>
                                <b>Entrega:</b>
                            </TableCell>
                            <TableCell align="left">
                                {new Date(
                                    pedido.pedido_data_entrega
                                ).toLocaleString("pt-BR", { timeZone: "UTC" })}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    <TableRow>
                        <TableCell>
                            <b>Produto:</b>
                        </TableCell>
                        <TableCell align="left">
                            {pedido.pedido_produto_nome}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Descrição:</b>
                        </TableCell>
                        <TableCell align="left">
                            {pedido.pedido_produto_descricao}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Valor Unitário:</b>
                        </TableCell>
                        <TableCell align="right">
                            {pedido.pedido_valor.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Quantidade:</b>
                        </TableCell>
                        <TableCell align="right">
                            {pedido.pedido_qtde}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <br />
            <Typography variant="h5" component="h2" align="right" gutterBottom>
                Total:{" "}
                {(pedido.pedido_valor * pedido.pedido_qtde).toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                )}
            </Typography>
        </div>
    );
};

export default Pedido;
