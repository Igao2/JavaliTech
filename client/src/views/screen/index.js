/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';

// import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';
import { NavLink } from "react-router-dom";

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

                    <BodyOff_top_off>

                        <h1>{String.nomeApp}</h1>
                        <h5>{String.nomeApp_descricao}</h5>

                    </BodyOff_top_off>

                    <BodyOff_buttom>
                        <NavLink to="/search">
                            <Button>
                                {String.search_OS_button}
                            </Button>
                        </NavLink>
                    </BodyOff_buttom>

                </BodyOff>
                <FooterOff>

                    <Footer_off />

                </FooterOff>
            </ContainerOff>
        </div >
    );
}

export default App;