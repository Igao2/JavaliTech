import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import String from '../../../assets/values/string.json'


import { Redirect, useParams } from "react-router-dom";

import { Button, Row, Col, Container } from 'reactstrap';
import osInfosResultManager from '../../../dispatcher/osInfosRequest';


import ViewOpenOs_on from './view_openOs_on';


function App(props) {

    /** Parametros da OS */
    let { item1, item2 } = useParams();
    const osId = item1;
    const osPass = item2;

    /** const useState para o redirecionamento para a tela de erro 400. */
    const redirect400 = useState(0);

    /** const useState para o redirecionamento para a tela de erro 500. */
    const redirect500 = useState(0);

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
            String.urlApi + 'userImages/standard_photo.png',
            { top: 0, left: 0, width: 100 }
        ]
    }

    /** const useState que armazena dados para o view OS. */
    const [dados, setDados] = useState(initDados);

    /** const useState que autoriza a renderização do componente "ViewOpenOs_on". */
    const dadosSearch = useState(0);

    /** useEffect que obtém as informações da OS = é executado a página carrega, obtém as informações da OS a ser ilustrada. */
    useEffect(() => {

        osInfosResultManager(osId, osPass).then(res => {
            switch (res.data) {
                case 500: redirect500[1](1); break;

                case 400: redirect400[1](1); break;

                case 401: redirect400[1](1); break;

                case 417: redirect400[1](1); break;

                case 204: redirect400[1](1); break;

                default:
                    setDados(res.data)
                    setInterval(() => {
                        dadosSearch[1](1);
                    }, 200);
            }
        }).catch(error => {
            redirect500[1](1);
        });

    }, []);

    /** Esta arrow function redireciona o usuario para a tela de editar OS. */
    const backToEditUserScreen = () => props.switchScreensFromProps(9);

    return (
        <Container>
            {redirect400[0] ? <Redirect to='/alert/T400/D400' /> : null}
            {redirect500[0] ? <Redirect to='/alert/T500/D500' /> : null}
            <br />
            <h2>{String.painelViewOs}:</h2>

            <Row md="2" sm="2" xs="1">
                <Col style={{ width: "75%" }}>
                    {dadosSearch[0] ? <ViewOpenOs_on {...(dados)} /> : null}

                </Col>
                <Col style={{ width: "25%" }}>
                    <br />
                    <br />
                    <Button
                        block
                        color="dark"
                        onClick={backToEditUserScreen}
                        href="#9"
                    >
                        {String.editOs}
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default App;