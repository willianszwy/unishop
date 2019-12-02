import React from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Login from "./views/login";
import Logout from "./views/logout";
import Recovery from "./views/recovery";
import Register from "./views/register";
import Home from "./views/home";
import Profile from "./views/profile";
import EditProfile from "./views/editProfile";
import Buy from "./views/buy";
import ProductList from "./views/productList";
import Sells from "./views/sells";
import Sell from "./views/sell";
import CreateProduct from "./views/createProduct";
import Config from "./views/config";
import Confirm from "./views/confirm";
import Password from "./views/password";
import ConfirmEmail from "./views/confirmEmail";
import Product from "./views/product";
import History from "./views/history";

import { isAuthenticated, isActivate } from "./services/auth";
import Purchase from "./views/purchase";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                isActivate() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/confirm",
                            state: { from: props.location }
                        }}
                    />
                )
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register/" component={Register} />
            <Route path="/recovery/" component={Recovery} />
            <Route path="/changepassword/:hash" component={Password} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/confirmEmail/:hash" component={ConfirmEmail} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/editProfile" component={EditProfile} />
            <PrivateRoute path="/buy" component={Buy} />
            <PrivateRoute path="/sells" component={Sells} />
            <PrivateRoute path="/sell/:id" component={Sell} />
            <PrivateRoute path="/purchase/:id" component={Purchase} />
            <PrivateRoute path="/products" component={ProductList} />
            <PrivateRoute path="/product/:id" component={Product} />
            <PrivateRoute path="/editProduct/:id" component={CreateProduct} />
            <PrivateRoute path="/createProduct" component={CreateProduct} />
            <PrivateRoute path="/config" component={Config} />
            <PrivateRoute path="/history" component={History} />
            <PrivateRoute path="/" component={Home} />

            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    </Router>
);

export default Routes;
