import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SellBar from "../components/SellBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import useForm from "../hooks/formHooks";
import StyledButton from "../components/Button";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Uploader from "../components/Uploader";
import Loader from "../components/Loader";
import api from "../services/api";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import getImageURL from "../helpers";

import { useParams } from "react-router-dom";
import Preview from "../components/Preview";

const useStyles = makeStyles({
    card: {
        marginTop: "10px",
        marginBottom: "80px"
    }
});

const initialData = {
    produto_nome: "",
    produto_descricao: "",
    produto_qtde: "",
    produto_valor: "",
    produto_foto: "",
    produto_status: 0
};

const CreateProduct = props => {
    let { id } = useParams();

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`/produtos/${id}`)
                .then(response => {
                    setInputs(response.data);
                    setPreview(getImageURL(response.data.produto_foto));
                    setShow(true);
                    setLoading(false);
                })
                .catch(error => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //if user click in product icon bar reset form
    React.useEffect(() => {
        setInputs(initialData);
        setShow(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const [loading, setLoading] = React.useState(false);
    const [preview, setPreview] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState();
    const [show, setShow] = React.useState(false);
    const classes = useStyles();
    const productHandle = async inputs => {
        try {
            if (!id) {
                await api.post("/produtos", {
                    ...inputs
                });
            } else {
                await api.put(`/produtos/${id}`, {
                    ...inputs
                });
            }
            props.history.push("/sell");
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.msg);
            } else if (error.request) {
                setErrors("Erro ao conectar o servidor");
            } else {
                setErrors(error);
            }
        }
    };
    const uploadHandle = file => {
        setSelectedFile(file[0]);
        let formData = new FormData();
        formData.append("image", file[0]);
        setLoading(true);
        api.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                setLoading(false);
                setInputs(inputs => ({
                    ...inputs,
                    produto_foto: response.data.uploaded_file
                }));
            })
            .catch(function() {
                console.log("FAILURE!!");
            });
    };

    React.useEffect(() => {
        if (!selectedFile) {
            setPreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setShow(true);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const {
        inputs,
        setInputs,
        handleInputChange,
        handleSubmit,
        setErrors
    } = useForm(productHandle, initialData);

    const handleStatusChange = event => {
        setInputs(inputs => ({
            ...inputs,
            produto_status: event.target.checked ? 1 : 0
        }));
    };

    return (
        <div>
            <Loader show={loading} />

            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <Preview src={preview} show={show ? true : false} />
                        {/* <Button size="small" startIcon={<ArrowBackIosIcon />} /> */}

                        <form onSubmit={handleSubmit}>
                            <Uploader onDrop={uploadHandle} />
                            <input
                                name="produto_foto"
                                onChange={handleInputChange}
                                value={inputs.produto_foto}
                                style={{ display: "none" }}
                            />

                            <div>
                                <TextField
                                    type="text"
                                    name="produto_nome"
                                    label="Nome Produto"
                                    onChange={handleInputChange}
                                    value={inputs.produto_nome}
                                    margin="dense"
                                    variant="filled"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    multiline
                                    rows="3"
                                    name="produto_descricao"
                                    label="Descrição Produto"
                                    onChange={handleInputChange}
                                    value={inputs.produto_descricao}
                                    margin="dense"
                                    variant="filled"
                                    fullWidth
                                    required
                                />
                            </div>

                            <FormControl
                                fullWidth
                                margin="dense"
                                variant="filled"
                            >
                                <InputLabel htmlFor="filled-adornment-amount">
                                    Valor
                                </InputLabel>
                                <FilledInput
                                    id="filled-adornment-amount"
                                    name="produto_valor"
                                    value={inputs.produto_valor}
                                    onChange={handleInputChange}
                                    type="number"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            R$
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div>
                                <TextField
                                    type="number"
                                    name="produto_qtde"
                                    onChange={handleInputChange}
                                    value={inputs.produto_qtde}
                                    fullWidth
                                    label="Quantidade"
                                    margin="dense"
                                    variant="filled"
                                    required
                                />
                            </div>
                            <div style={{ display: id ? "block" : "none" }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={
                                                    parseInt(
                                                        inputs.produto_status
                                                    ) === 1
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleStatusChange}
                                                value="checked"
                                            />
                                        }
                                        label={
                                            parseInt(inputs.produto_status) ===
                                            1
                                                ? "Ativo"
                                                : "Inativo"
                                        }
                                    />
                                </FormGroup>
                            </div>
                            <StyledButton type="submit" fullWidth>
                                {!id ? "Cadastrar" : "Salvar"}
                            </StyledButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <SellBar active={2} />
        </div>
    );
};

export default CreateProduct;
