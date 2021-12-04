/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import { useParams } from "react-router-dom";
import String from '../../assets/values/string.json';
import { BodyOff, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';


import 'bootstrap/dist/css/bootstrap.min.css';
import Footer_off from '../components/footers/footers_off';
import InfoAlert from '../components/painel/info_alert';

function App() {

    /** Parametros do alert */
    const { title, describe } = useParams();

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

                    <InfoAlert
                        titleAlert={String.titlesAlert[title]}
                        describeAlert={String.describesAlert[describe]}
                    />

                </BodyOff>
                <FooterOff>

                    <Footer_off />

                </FooterOff>
            </ContainerOff>
        </div >
    );
}

export default App;