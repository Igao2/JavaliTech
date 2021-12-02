import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import String from '../../../assets/values/string.json'

import { Button, Row, Col, Container } from 'reactstrap';
import { ItemColAvatar, AlertDelet } from '../../../assets/values/styles';

import updateInfosManager from '../../../dispatcher/updateInfos';

const tokenManager = require('../../../dispatcher/tokenManager');

export default class InfoAlert extends Component {
    render() {

        const backToEditUserScreen = () => this.props.switchScreensFromProps(2);

        const deleteUser = () => {
            updateInfosManager(5, "", { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {
                this.props.deleteUserRedirect();
            })
        };
        return (
            <Container>
                <br />
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
                                onClick={deleteUser}
                            >
                                {String.yes}
                            </Button>
                        </Col>
                        <Col>
                            <br />
                            <Button
                                block
                                color="dark"
                                onClick={backToEditUserScreen}
                                href="#2"
                            >
                                {String.no}
                            </Button>
                        </Col>
                    </Row>
                </ItemColAvatar>
            </Container>
        )
    }
}
