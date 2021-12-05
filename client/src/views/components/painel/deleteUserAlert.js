import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import String from '../../../assets/values/string.json'

import { Button, Row, Col, Container } from 'reactstrap';
import { ItemColAvatar, AlertDelet } from '../../../assets/values/styles';

import updateInfosManager from '../../../dispatcher/updateInfos';

const tokenManager = require('../../../dispatcher/tokenManager');

/**
 * @class
 * @description Componente que gera uma tela de alerta que pergunta de o usuário realmente quer deletar sua conta
 */
class deleteUserAlert extends Component {
    render() {

        /*** Esta arrow function redireciona o usuario para a tela de editar informaçoes do usuario. */
        const backToEditUserScreen = () => this.props.switchScreensFromProps(2);

        /** Esta arrow function deleta a conta do usuario e chama a função "deleteUserRedirect". */
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
                        Você realmente deseja deletar essa conta?
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
export default deleteUserAlert;