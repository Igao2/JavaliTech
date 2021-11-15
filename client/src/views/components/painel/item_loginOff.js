/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser, QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';
import ViewOS from './view_os';


class ItemLoginOff extends React.Component {
    render() {
        return (
            <Container>

                <br />
                <ItemColAvatar>
                    <h1>{String.quest_loginoff}</h1>
                    <AlertDelet>
                        {String.quest_loginoff_text}
                    </AlertDelet>
                    <Row md="2" sm="2" xs="1">
                        <Col>
                            <br />
                            <Button
                                block
                                color="dark"
                            >
                                {String.yes}
                            </Button>
                        </Col>
                        <Col>
                            <br />
                            <Button
                                block
                                color="dark"
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

export default ItemLoginOff;