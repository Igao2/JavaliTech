/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemColAvatar } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Button } from 'reactstrap';



class ItemLoginOff extends React.Component {
    render() {

        /** redireciona o usuário para a tela de bem vindo do painel */
        const backToWelcomeScreen = () => this.props.switchScreensFromProps(1);

        /** desloga o usuário */
        const logoutUser = () => this.props.logout();

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
                                onClick={logoutUser}
                            >
                                {String.yes}
                            </Button>
                        </Col>
                        <Col>
                            <br />
                            <Button
                                block
                                color="dark"
                                onClick={backToWelcomeScreen}
                                href="#1"
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