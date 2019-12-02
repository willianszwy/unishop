import React from "react";
import { StyledHome } from "./home.styled";
import AppBar from "../components/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchBar from "material-ui-search-bar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";
import api from "../services/api";
import Loader from "../components/Loader";
import { Link as RLink } from "react-router-dom";

import { Rating } from "@material-ui/lab";

import getImageURL from "../helpers";

const useStyles = makeStyles({
    card: {
        marginBottom: "15px"
    },
    media: {
        height: 200
    }
});

const Home = () => {
    const classes = useStyles();
    // const user = getUser();
    const [searchValue, setSearchValue] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        handleSearch("");
    }, []);

    const handleSearch = search => {
        setLoading(true);
        api.get("/produtos/busca?q=" + search).then(response => {
            setProducts(response.data);
            setLoading(false);
        });
    };

    return (
        <div>
            <Loader show={loading} />
            <StyledHome>
                <Container maxWidth="sm">
                    <div className="search-menu">
                        <SearchBar
                            placeholder="Busca"
                            value={searchValue}
                            onChange={value => setSearchValue(value)}
                            onRequestSearch={() => handleSearch(searchValue)}
                            onCancelSearch={() => setSearchValue("")}
                            style={{
                                margin: "20px auto",
                                maxWidth: 600
                            }}
                        />
                    </div>
                    {products.map(product => {
                        return (
                            <RLink
                                key={product.produto_id}
                                to={`/product/${product.produto_id}`}
                            >
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={getImageURL(
                                            product.produto_foto
                                        )}
                                        title={product.produto_nome}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            align="right"
                                        >
                                            <Rating
                                                name="half-rating"
                                                precision={0.5}
                                                value={product.avaliacao}
                                                readOnly
                                            />
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            gutterBottom
                                        >
                                            {product.produto_nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            component="p"
                                        >
                                            {product.produto_descricao}
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            component="h1"
                                            align="right"
                                        >
                                            {product.produto_valor.toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL"
                                                }
                                            )}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </RLink>
                        );
                    })}
                </Container>
            </StyledHome>
            <AppBar active={0} />
        </div>
    );
};

export default Home;
