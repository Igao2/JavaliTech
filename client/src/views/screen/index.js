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

function App() {
    var searchBar;
    useState(searchBar);
    const [value, setValue] = useState({
        "service_order_id": "00",
        "owner_name": "Ana Lise",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed mauris eu tellus volutpat iaculis. Duis efficitur ipsum urna, sit amet hendrerit mauris suscipit in. Suspendisse ut leo congue eros malesuada fermentum. Pellentesque id diam eget odio pharetra lacinia viverra id nisl. Donec ligula tortor, ultricies eu viverra id, posuere et justo. Pellentesque eu libero eleifend, ornare libero a, aliquet lorem. Morbi sed suscipit enim. Nullam augue quam, congue sed magna posuere, fringilla cursus nulla.",
        "device_photos": "ban",
        "delivery_date": "31/02/1990",
        "completion_date": "-1/01/2022",
        "status": "Divorciado",
        "service_value": "3 Reaix",
        "user_name": "Steve Macqueen",
        "user_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2oo2DMYa3vo-93KIrS9K8bUc0_aRvjnMRBg&usqp=CAU"
    });

    const onChangeEvent = event => {
        let code = event.target.value.toUpperCase();
        event.target.value = code;

        if (code.length === 6) {
            searchResultManager(code).then(res => {
                if (res.data === 204) alert("OS não existe")
                else if (res.data === 417) alert("OS corronpida")
                else if (res.data === 500) alert("Erro de sistema")
                else setValue(res.data)
            });
        } else
            setValue({ ...null, "user_photo": ["", ""] });

    }
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

                        <h6>{String.search_OS}</h6>

                        {/* invalid: vermelho | valid: verde */}

                        <Form>
                            <FormGroup row>
                                <Input
                                    // valid
                                    id="cod_OS"
                                    type="text"
                                    maxLength="6"
                                    placeholder={String.cod_OS}
                                    name='searchText'
                                    value={searchBar}
                                    onChange={onChangeEvent}
                                />
                            </FormGroup>
                        </Form>
                        <ViewOS
                            service_order_id={value.service_order_id}
                            owner_name={value.owner_name}
                            description={value.description}
                            delivery_date={value.delivery_date}
                            completion_date={value.completion_date}
                            status={value.status}
                            service_value={value.service_value}
                            user_name={value.user_name}
                            user_photo={value.user_photo}
                        />

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