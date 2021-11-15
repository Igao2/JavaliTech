/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOffIcon_home, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';
import searchResultManager from '../../dispatcher/searchBarRequest';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Form, FormGroup, Table } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';
import ViewOS from '../components/painel/view_os';
import ViewOpenOs_on from '../components/painel/view_openOs_on';

function App() {

    return (
        <div>
            <Helmet>
                <title>{String.nomeApp_sistema}</title>
                <meta name="title" content={String.nomeApp_sistema} />
                <meta property="og:title" content={String.nomeApp_sistema} />
                <meta property="og:site_name" content={String.nomeApp_sistema} />
                <meta property="og:description" content={String.nomeApp_descricao} />
            </Helmet>

            <ContainerOff>
                <HeaderOff>

                    <HeaderContainerOff />

                </HeaderOff>
                <BodyOff>

                    <ViewOpenOs_on/>

                </BodyOff>
                <FooterOff>

                    <Footer_off />

                </FooterOff>
            </ContainerOff>
        </div >
    );
}

export default App;