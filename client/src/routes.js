import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './views/screen/index';
import Search from './views/screen/search';
import Login from './views/screen/login';
import PainelUser from './views/screen/painel_user';
import Register from './views/register';
import ListaOS from './views/components/painel/listaOS';

import Temp from './views/screen/registrar';
// import Temp from './views/register/index';
import Temp1 from './views/register/index2';

const tokenManager = require('./dispatcher/tokenManager');


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            tokenManager.checkToken() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/register" component={Temp} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/painel" component={PainelUser} />


            <PrivateRoute path="/tmp" component={Register} />
            <PrivateRoute path="/tmp1" component={Temp1} />

            <PrivateRoute path="/listaOS" component={ListaOS} />
        </Switch>
    </BrowserRouter>
);

export default Routes