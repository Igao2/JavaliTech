import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './views/screen/index';
import Search from './views/screen/search';
import Login from './views/screen/login';
import PainelUser from './views/screen/painel_user';
import Register from './views/screen/registrar';
import ViewOs from './views/screen/openOs_off';
import Alert from './views/screen/alerts_auto';


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
            <Route exact path="/register" component={Register} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/viewOs/:osId/:osPass" component={ViewOs} />
            <Route exact path="/alert/:title/:describe" component={Alert} />
            <PrivateRoute exact path="/painel" component={PainelUser} />
            <PrivateRoute exact path="/painel/:item1/:item2" component={PainelUser} />


            {/* <PrivateRoute path="/tmp" component={Register} />
            <PrivateRoute path="/tmp1" component={Temp1} /> */}

        </Switch>
    </BrowserRouter>
);

export default Routes