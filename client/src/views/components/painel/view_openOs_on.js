/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemColTextOS, ItemDiv, ItemMsgUser, QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';


class ViewOpenOs_on extends React.Component {
    render() {
        return (
            <Container>
                <br />
                {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
						<Alert color="warning" dismissible>{String.osOsProcessView}: {String.trespontos}</Alert>
						
                <QuadrosOS>
                    <h6>{String.osInfoBasic}: </h6>
                    <Row md="3" sm="3" xs="1">
                        <Col>
                            <ItemColAvatar>
                                <ItemAvatar src={avatarTMP} />

                            </ItemColAvatar>
                        </Col>
                        <Col>
                            <ItemColTextOS>
                                <p>
                                    <h2>{String.itemInfo01_tmp}</h2>
                                    {String.itemInfo02_tmp}
                                    <br />
                                    {String.itemInfo03_tmp}
                                    <br />
                                    {String.itemInfo04_tmp}

                                </p>
                            </ItemColTextOS>
                        </Col>
                        <Col>
                            <ItemColAvatar>
                                <h6>{String.osPassAcess}:</h6>
                                <h2>{String.osPassAcessTemp}</h2>
                            </ItemColAvatar>
                        </Col>
                    </Row>
                </QuadrosOS>
                <QuadrosOS>
                    <h4>{String.osCATinfo}:</h4>
                    <ItemDiv />

                    <h6>{String.owner_name}: {String.trespontos}</h6>
                    <h6>{String.owner_information}: {String.trespontos}</h6>

                </QuadrosOS>
                <QuadrosOS>
                    <h4>{String.osInfoService}: </h4>
                    <ItemDiv />

                    <h6>{String.description}:</h6>
                    <h6>{String.lorem}</h6>
                    <ItemDiv />
                    <h6>{String.device_name}:</h6>
                    <h6>{String.lorem}</h6>
                    <ItemDiv />
                    <Container>
                        <Row md="2" sm="2" xs="1">
                            <Col>
                                <AlertDelet>
                                    <h6>{String.delivery_date}: {String.dateTemp}</h6>
                                </AlertDelet>
                            </Col>
                            <Col>
                                <AlertDelet>
                                    <h6>{String.completion_date}: {String.dateTemp} </h6>
                                </AlertDelet>
                            </Col>
                        </Row>
                    </Container>
                    
                    <ItemDiv />
                    <h6>{String.service_value}:</h6>
                    <h6><b>{String.tipoMoeda} {String.valortemp}</b></h6>

                </QuadrosOS>
                
                <QuadrosOS>
                    <h6>{String.osPDF}</h6>
                    <Button
                        block
                        color="dark"
                    >
                        {String.creatPDF}
                    </Button>
                </QuadrosOS>


            </Container>

        )
    }
}

export default ViewOpenOs_on;