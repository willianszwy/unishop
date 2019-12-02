import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "../components/AppBar";
import Loader from "../components/Loader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getUser } from "../services/auth";
import api from "../services/api";
import getImageURL from "../helpers";
import StyledButton from "../components/Button";
import { Link as RLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

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

const Profile = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [usuario, setUsuario] = React.useState(getUser());
    React.useEffect(() => {
        setLoading(true);
        api.get(`/usuarios/${usuario.usuario_id}`).then(response => {
            setUsuario(response.data);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <Loader show={loading} />
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <Avatar
                            alt="usuario"
                            src={getImageURL(usuario.usuario_foto)}
                            className={classes.bigAvatar}
                            style={{ alignSelf: "center" }}
                        />
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            align="center"
                        >
                            {usuario.usuario_nome}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="large"
                            fullWidth
                            startIcon={<EditIcon />}
                            component={RLink}
                            to="/editProfile"
                        >
                            Editar
                        </Button>
                    </CardActions>
                    <CardActions>
                        <StyledButton fullWidth component={RLink} to="/logout">
                            Sair
                        </StyledButton>
                    </CardActions>
                </Card>
            </Container>
            <AppBar active={3} />
        </div>
    );
};

export default Profile;
