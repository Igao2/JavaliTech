/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import osInfosResultManager from '../../dispatcher/osInfosRequest';

import { Redirect, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer_off from '../components/footers/footers_off';
import ViewOpenOs_on from '../components/painel/view_openOs_on';

function App() {

    /** Parametros da os */
    const { osId, osPass } = useParams();

    /** const useState para o redirecionamento para a tela de alert com o erro 400. */
    const redirect400 = useState(0);

    /** const useState para o redirecionamento para a tela de alert com o erro 500. */
    const redirect500 = useState(0);

    /** const quedefine a estrutura base da os. */
    const initDados = {
        service_order_id: '',
        owner_name: '',
        owner_information: '',
        description: '',
        device_name: '',
        delivery_date: '',
        completion_date: '',
        status: "",
        service_value: "",
        user_name: '',
        user_email: '',
        user_address: {
            cep: '',
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            numero: '',
            complemento: ''
        },
        user_telephone: '',
        user_photo: [
            String.urlApi + '/userImages/standard_photo.png',
            { top: 0, left: 0, width: 0 }
        ]
    }

    /** const useState armazena a estrutura dos dados da OS. */
    const [dados, setDados] = useState(initDados);

    /** useEffect de obtenção de dados = é executado quando a página carrega, odtem os dados da OS em questão */
    useEffect(() => {

        osInfosResultManager(osId, osPass).then(res => {
            switch (res.data) {
                case 500: redirect500[1](1); break;

                case 400: redirect400[1](1); break;

                case 401: redirect400[1](1); break;

                case 417: redirect400[1](1); break;

                case 204: redirect400[1](1); break;

                default: setDados(res.data)
            }
        }).catch(error => {
            redirect500[1](1);
        });

    }, []);

    return (
        <div>
            {redirect400[0] ? <Redirect to='/alert/T400/D400' /> : null}
            {redirect500[0] ? <Redirect to='/alert/T500/D500' /> : null}
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

                    <ViewOpenOs_on {...(dados)} />

                </BodyOff>
                <FooterOff>

                    <Footer_off />

                </FooterOff>
            </ContainerOff>
        </div >
    );
}

export default App;