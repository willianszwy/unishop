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

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

const Routes = () => (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register/" component={Register} />
            <Route path="/recovery/" component={Recovery} />
            <PrivateRoute path="/" component={Home} />
            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    </Router>
);

export default Routes;
