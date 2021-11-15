/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemColTextOS, ItemDiv, ItemMsgUser, QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';


class ItemAddOs extends React.Component {
    render() {
        return (
            <Container>

                <br />
                <h3>{String.menuAddOS}</h3>
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
                    <h6>{String.osCATinfo}:</h6>
                    <Form>
                        <FormGroup>
                            <Input
                                id="owner_name"
                                name="owner_name"
                                type="text"
                                placeholder={String.owner_name}
                            />
                            <br />
                            <Input
                                id="owner_information"
                                name="owner_information"
                                type="textarea"
                                placeholder={String.owner_information}
                            />
                        </FormGroup>
                    </Form>
                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osInfoService}: </h6>
                    <Form>
                        <FormGroup>
                            <Input
                                id="description"
                                name="description"
                                type="textarea"
                                placeholder={String.description}
                            />
                            <br />
                            <Input
                                id="device_name"
                                name="device_name"
                                type="text"
                                placeholder={String.device_name}
                            />
                            <Row md="2" sm="2" xs="1">
                                <Col>
                                    <br />
                                    <Input
                                        id="delivery_date"
                                        name="delivery_date"
                                        type="text"
                                        placeholder={String.delivery_date}
                                    />
                                </Col>
                                <Col>
                                    <br />
                                    <Input
                                        id="completion_date"
                                        name="completion_date"
                                        type="text"
                                        placeholder={String.completion_date}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <Input
                                id="service_value"
                                name="service_value"
                                type="text"
                                placeholder={String.service_value}
                            />
                        </FormGroup>
                    </Form>
                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osOsProcess}: </h6>
                    <Form>
                        <FormGroup>
                            <Input
                                className="mb-3"
                                type="select"
                            >
                                <option>
                                    {String.stauts_wait}
                                </option>
                                <option>
                                    {String.status_init}
                                </option>
                                <option>
                                    {String.status_pause}
                                </option>
                                <option>
                                    {String.status_stop}
                                </option>
                                <option>
                                    {String.status_finish}
                                </option>
                            </Input>

                        </FormGroup>
                    </Form>
                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osAdd}</h6>
                    <Button
                        block
                        color="dark"
                    >
                        {String.save}
                    </Button>
                </QuadrosOS>


            </Container>

        )
    }
}

export default ItemAddOs;