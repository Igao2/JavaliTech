/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemColAvatar, ProfilePhoto, ItemColTextOS, ItemDiv, QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Button } from 'reactstrap';

import avatarBackground from '../../../assets/images/icons/backgroundAvatar.png';

import { PDFDownloadLink } from '@react-pdf/renderer';

import OsPdf from './pdfFactory';

/**
 * @class
 * @description Componente que gera uma tela de visualização da OS
 */
class ViewOpenOs_on extends React.Component {
    render() {
        return (
            <Container>
                <br />
                <QuadrosOS>
                    <h6>{String.osInfoBasic}: </h6>
                    <Row md="3" sm="3" xs="1">
                        <Col>
                            <ItemColAvatar>
                                <ProfilePhoto imgUrl={avatarBackground}>
                                    <img
                                        src={this.props.user_photo[0]}
                                        alt="Imagem"
                                        style={{
                                            left: this.props.user_photo[1].left + "px",
                                            top: this.props.user_photo[1].top + "px",
                                            width: this.props.user_photo[1].width + "%"
                                        }}
                                    />
                                </ProfilePhoto>

                            </ItemColAvatar>
                        </Col>
                        <Col>
                            <ItemColTextOS>
                                <p>
                                    <h2>{this.props.user_name}</h2>
                                    {this.props.user_address.rua}, {this.props.user_address.bairro}, {this.props.user_address.cidade}, {this.props.user_address.estado}
                                    <br /><br />
                                    {this.props.user_telephone}
                                    <br />
                                    {this.props.user_email}

                                </p>
                            </ItemColTextOS>
                        </Col>
                        <Col>
                            <ItemColAvatar>

                                <h6>{String.osCodeAcess}:</h6>
                                <h4>{this.props.service_order_id}</h4>

                                <h6>{String.osPassAcess}:</h6>
                                <h4>{this.props.senha}</h4>
                            </ItemColAvatar>
                        </Col>
                    </Row>
                </QuadrosOS>
                <QuadrosOS>
                    <h4>{String.osCATinfo}:</h4>
                    <ItemDiv />

                    <h6>{String.owner_name}: {this.props.owner_name}</h6>
                    <h6>{String.owner_information}: {this.props.owner_information}</h6>

                </QuadrosOS>
                <QuadrosOS>
                    <h4>{String.osInfoService}: </h4>
                    <ItemDiv />

                    <h6>{String.device_name}: {this.props.device_name}</h6>
                    <ItemDiv />
                    <h6>{String.description}:</h6>
                    <h6>{this.props.description}</h6>
                    <ItemDiv />
                    <Container>
                        <Row md="2" sm="2" xs="1">
                            <Col>
                                <AlertDelet>
                                    <h6>{String.delivery_date}: {this.props.delivery_date ? this.props.delivery_date.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}</h6>
                                </AlertDelet>
                            </Col>
                            <Col>
                                <AlertDelet>
                                    <h6>{String.completion_date}: {this.props.completion_date ? this.props.completion_date.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}</h6>
                                </AlertDelet>
                            </Col>
                        </Row>
                    </Container>

                    <ItemDiv />
                    <h6>{String.service_value}:  <b>{String.tipoMoeda} {this.props.service_value}</b></h6>

                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osPDF}</h6>
                    <PDFDownloadLink document={<OsPdf {...(this.props)} />} fileName="somename.pdf">
                        {
                            ({ loading }) => loading ?
                                <Button
                                    block
                                    color="dark"
                                >
                                    <img alt="loading.gif" style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" />
                                </Button> : <Button
                                    block
                                    color="dark"
                                >
                                    {String.creatPDF}
                                </Button>
                        }
                    </PDFDownloadLink>
                </QuadrosOS>


            </Container>

        )
    }
}

export default ViewOpenOs_on;