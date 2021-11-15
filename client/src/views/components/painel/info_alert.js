import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import String from '../../../assets/values/string.json'

import { Card, CardTitle, CardText, Button, Row, Col, Container } from 'reactstrap';
import { FotoCentoOitenta, ParagrafLeftGeral, ItemColAvatar, AlertDelet } from '../../../assets/values/styles';

export default class InfoAlert extends Component {
    render() {
        return (
            <Container>
                <br/>
                    <ItemColAvatar>
                        <h1>{this.props.titleAlert}</h1>
                        <AlertDelet>
                            {String.describeAlert}
                        </AlertDelet>
                        <Row md="2" sm="2" xs="1">
                            <Col>
                                <br />
                                <Button
                                    block
                                    color="dark"
                                >
                                    {String.no}
                                </Button>
                            </Col>
                            <Col>
                                <br />
                                <Button
                                    block
                                    color="dark"
                                >
                                    {String.yes}
                                </Button>
                            </Col>
                        </Row>
                    </ItemColAvatar>
            </Container>
        )
    }
}
