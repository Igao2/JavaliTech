/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser, QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';


class ItemEditUser extends React.Component {
    render() {
        return (
            <Container>
                <br />

                <h3>{String.menuEditUser}</h3>
                <ItemDiv />
                <Row md="2" sm="2" xs="1">
                    <Col>
                        <ItemColAvatar>
                            {/* Foto de Perfil */}
                            <ItemAvatar src={avatarTMP} />
                            <Form>
                                <FormGroup>
                                    {/* Posicionar Foto de perfil */}
                                    <QuadrosOS>
                                    <Button color="dark"> {String.left} </Button> <Button color="dark"> {String.up} </Button>  <Button color="dark"> {String.down} </Button> <Button color="dark"> {String.right} </Button>
                                    </QuadrosOS>
                                </FormGroup>
                            </Form>
                        </ItemColAvatar>
                    </Col>
                    <Col>
                        <h5>{String.userAvatarUpdate}: </h5>
                        <Form>
                            <FormGroup>
                                {/* Atualizar foto de Perfil */}
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                />
                                <br />
                                <Button block color="dark" >
                                    {String.send}
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <ItemDiv />
                <h5>{String.email}: </h5>
                <Form>
                    <FormGroup>
                        <Input
                            id="newEmail"
                            name="newEmail"
                            placeholder={String.userEmailUpdate}
                            type="email"
                        />
                    </FormGroup>

                    <Button
                        block
                        color="dark"
                    >
                        {String.save}
                    </Button>

                </Form>
                <ItemDiv />
                <Row md="2" sm="2" xs="1" >
                    <Col size="200px">
                        {/* Atualizar Nome/Endereço/Numero de Telefone */}
                        <h5>{String.datas}: </h5>
                        <Form>
                            <FormGroup>
                                <Input
                                    id="newLogin"
                                    name="newLogin"
                                    placeholder={String.userNameUpdate}
                                    type="text"
                                />
                                <br />
                                <Input
                                    id="newEmail"
                                    name="newEmail"
                                    placeholder={String.userAaddressUpdate}
                                    type="text"
                                />
                                <br />
                                <Input
                                    id="newTell"
                                    name="newTell"
                                    placeholder={String.userTellUpdate}
                                    type="text"
                                />
                            </FormGroup>

                            <Button
                                block
                                color="dark"
                            >
                                {String.save}
                            </Button>

                        </Form>
                    </Col>
                    <Col>
                        {/* Atualizar senha */}
                        <h5>{String.pass}: </h5>
                        <Form>
                            <FormGroup>
                                <Input
                                    id="newPass"
                                    name="newPass"
                                    placeholder={String.userPassUpdate}
                                    type="password"
                                />
                                <br />
                                <Input
                                    id="newPassRepet"
                                    name="newPassRepet"
                                    placeholder={String.userPassRepet}
                                    type="password"
                                />
                            </FormGroup>

                            <Button block color="dark" >
                                {String.save}
                            </Button>

                        </Form>
                    </Col>
                </Row>
                <ItemDiv />
                <Form>
                    <AlertDelet>

                        <h4>{String.userDelteCount}? </h4>
                        <Button
                            block
                            color="danger"
                        >
                            {String.save}
                        </Button>
                    </AlertDelet>
                </Form>
                <br />

            </Container>

        )
    }
}

export default ItemEditUser;