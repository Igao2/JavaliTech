import React from "react";
import { isAuthenticated } from "./dispatcher/authentication";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './views/screen/index';
import Search from './views/screen/search';
import Login from './views/screen/login';
import PainelUser from './views/screen/painel_user';
import Register from './views/register';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/login" component={Login} />
            <PrivateRoute path="/painel" component={PainelUser} />
        </Switch>
    </BrowserRouter>
);

export default Routes