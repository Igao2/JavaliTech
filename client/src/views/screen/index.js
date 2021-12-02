/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';

// import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';
import { NavLink } from "react-router-dom";

function App() {
    /** const useState para alertar errors, warnings, informs e etc... */
    const [announcement, setAnnouncement] = useState({
        enabled: 0,
        type: "",
        massage: ""
    })

    useEffect(() => {
        if (window.location.href.indexOf("#") >= 0) {
            if (window.location.href.slice(-3) === "500") {
                setAnnouncement({
                    enabled: 1,
                    type: "danger",
                    massage: String.error500
                });
            } else if (window.location.href.slice(-3) === "200") {
                setAnnouncement({
                    enabled: 1,
                    type: "warning",
                    massage: "Sua conta foi deletada com sucesso."
                });
            }

        }
    }, []);


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

                        {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
                        {announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

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