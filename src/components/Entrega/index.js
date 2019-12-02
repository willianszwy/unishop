import React from "react";
import { Radio, FormLabel, TextField } from "@material-ui/core";

const Entrega = ({ vendedor, onChange }) => {
    const [selectedValue, setSelectedValue] = React.useState("e");
    const [entrega, setEntrega] = React.useState("");

    const handleChange = event => {
        setSelectedValue(event.target.value);
        if (event.target.value === "f") {
            setEntrega("");
            onChange(event.target.value, vendedor.usuario_local_atend);
        } else {
            onChange(event.target.value, entrega);
        }
    };

    const handleInput = event => {
        setEntrega(event.target.value);
        onChange(selectedValue, event.target.value);
    };

    return (
        <div>
            {parseInt(vendedor.usuario_status_entrega) === 1 ? (
                <div>
                    <FormLabel component="legend">
                        <Radio
                            checked={selectedValue === "e"}
                            onChange={handleChange}
                            value="e"
                            name="radio-button"
                            inputProps={{ "aria-label": "A" }}
                            required
                        />
                        Entregar:
                    </FormLabel>
                    {selectedValue === "e" ? (
                        <TextField
                            multiline
                            rows="3"
                            name="usuario_local_entrega"
                            label="Estou aguardando:"
                            onChange={handleInput}
                            value={entrega}
                            margin="dense"
                            variant="filled"
                            required
                            fullWidth
                        />
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}

            {parseInt(vendedor.usuario_status_local) === 1 ? (
                <div>
                    <FormLabel component="legend">
                        <Radio
                            checked={selectedValue === "f"}
                            onChange={handleChange}
                            value="f"
                            name="radio-button"
                            inputProps={{ "aria-label": "B" }}
                            required
                        />
                        Retirar:
                    </FormLabel>
                    {selectedValue === "f" ? (
                        <TextField
                            InputProps={{
                                readOnly: true
                            }}
                            multiline
                            rows="3"
                            name="usuario_local_atend"
                            label="Local atendimento fixo"
                            value={vendedor.usuario_local_atend}
                            margin="dense"
                            variant="outlined"
                            // required
                            fullWidth
                        />
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Entrega;
