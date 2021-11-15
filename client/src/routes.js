import React from "react";
import { isAuthenticated } from "./dispatcher/authentication";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './views/screen/index';
import Search from './views/screen/search';
import Login from './views/screen/login';
import PainelUser from './views/screen/painel_user';

import Temp from './views/screen/registrar';
// import Temp from './views/register/index';
import Temp1 from './views/register/index2';


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
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/login" component={Login} />
            <PrivateRoute path="/painel" component={PainelUser} />

            
            <PrivateRoute path="/tmp" component={Temp} />
            <PrivateRoute path="/tmp1" component={Temp1} />
            
        </Switch>
    </BrowserRouter>
);

export default Routes