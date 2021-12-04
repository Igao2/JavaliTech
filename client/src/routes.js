import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

/** Rota inicial */
import Index from './views/screen/index';

/** Rota de buscar OS */
import Search from './views/screen/search';

/** Rota de login */
import Login from './views/screen/login';

/** Rota do Painel */
import PainelUser from './views/screen/painel_user';

/** Rota de cadastro */
import Register from './views/screen/registrar';

/** Rota de visualizar OS */
import ViewOs from './views/screen/openOs_off';

/** Rota dos alerts */
import Alert from './views/screen/alerts_auto';


const tokenManager = require('./dispatcher/tokenManager');

/** Esta arrow function cria um componente que protege as rotas que não podem ser acesa das por usuários que não estão logados */
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

        </Switch>
    </BrowserRouter>
);

export default Routes