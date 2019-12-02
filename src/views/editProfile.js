import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "../components/AppBar";
import Loader from "../components/Loader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getUser, setUser } from "../services/auth";
import api from "../services/api";
import getImageURL from "../helpers";
import StyledButton from "../components/Button";
import Uploader from "../components/Uploader";

const useStyles = makeStyles({
    card: {
        marginTop: "10px"
    },
    avatar: {
        // margin: 10
    },
    bigAvatar: {
        margin: "10px auto",
        width: 120,
        height: 120
    }
});

const EditProfile = props => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [usuario, setUsuario] = React.useState({
        ...getUser(),
        usuario_senha: ""
    });

    const [preview, setPreview] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState();

    React.useEffect(() => {
        setLoading(true);
        api.get(`/usuarios/${usuario.usuario_id}`).then(response => {
            setUsuario({ ...usuario, ...response.data });
            setPreview(getImageURL(response.data.usuario_foto));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!selectedFile) {
            setPreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

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
                setUsuario({
                    ...usuario,
                    usuario_foto: response.data.uploaded_file
                });
            })
            .catch(function() {
                console.log("FAILURE!!");
            });
    };

    const handleInputChange = event => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        if (event) {
            event.preventDefault();
        }
        setLoading(true);
        api.put(`/usuarios/${usuario.usuario_id}`, usuario).then(response => {
            setUser(usuario);
            setLoading(false);
            props.history.push("/profile");
        });
    };

    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Avatar
                                alt="Foto usuario"
                                src={preview}
                                className={classes.bigAvatar}
                                style={{ alignSelf: "center" }}
                            />
                            <Uploader onDrop={uploadHandle} />

                            <input
                                name="usuario_foto"
                                onChange={handleInputChange}
                                value={usuario.usuario_foto}
                                style={{ display: "none" }}
                            />
                            <TextField
                                type="text"
                                name="usuario_nome"
                                label="Nome"
                                onChange={handleInputChange}
                                value={usuario.usuario_nome}
                                margin="dense"
                                variant="filled"
                                fullWidth
                                required
                            />
                            <TextField
                                type="password"
                                name="usuario_senha"
                                label="Nova Senha"
                                onChange={handleInputChange}
                                value={usuario.usuario_senha}
                                margin="dense"
                                variant="filled"
                                fullWidth
                            />
                        </CardContent>
                        <CardActions>
                            <StyledButton fullWidth type="submit">
                                Salvar
                            </StyledButton>
                        </CardActions>
                    </form>
                </Card>
            </Container>
            <AppBar active={3} />
        </div>
    );
};

export default EditProfile;
