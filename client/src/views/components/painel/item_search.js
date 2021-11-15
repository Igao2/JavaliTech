/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser, QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';
import ViewOS from './view_os';


class ItemSearch extends React.Component {
    render() {
        return (
            <Container>
                <br />

                <h3>{String.search_OS}</h3>

                <QuadrosOS>
                    <Form>
                        <FormGroup>
                            <h6>{String.search}</h6>
                            <Input
                                id="newLogin"
                                name="newLogin"
                                type="text"
                            />
                            <br />
                            <h6>{String.filtroOs}</h6>
                            {/* OBS:
                                Estão listados nos filtros apenas:
                                "filtroOs":"Selecione o Tipo de Filtro",
                                "filtro_service_order_id":"Codigo da Ordem de Serviço",
		                        "filtro_senha":"Senha de Acesso",
		                        "filtro_owner_information":"Dados do Cliente",
		                        "filtro_owner_name":"Filtrar por nome do Cliente",
                                "filtro_device_name":"Fados do Aparalho",
                                "filtro_delivery_date":"Data de Entrada",
                                "filtro_completion_date":"Data de Entrega",
                                "filtro_status":"Processo",
                                "filtro_service_value":"Valor"
                            */}
                            <Input
                                className="mb-3"
                                type="select"
                            >
                                <option>
                                    {String.filtro_service_order_id}
                                </option>
                                <option>
                                    {String.filtro_senha}
                                </option>
                                <option>
                                    {String.filtro_owner_information}
                                </option>
                                <option>
                                    {String.filtro_owner_name}
                                </option>
                                <option>
                                    {String.filtro_device_name}
                                </option>
                                <option>
                                    {String.filtro_delivery_date}
                                </option>
                                <option>
                                    {String.filtro_completion_date}
                                </option>
                                <option>
                                    {String.filtro_status}
                                </option>
                                <option>
                                    {String.filtro_service_value}
                                </option>
                            </Input>
                        </FormGroup>

                        <Button
                            block
                            color="dark"
                        >
                            {String.search}
                        </Button>

                    </Form>
                </QuadrosOS>
                <Table
                    bordered
                    hover
                    responsive
                    size="sm"
                >
                    <thead>
                        <tr>
                            <th>
                                {String.service_order_id}
                            </th>
                            <th>
                                {String.device_name}
                            </th>
                            <th>
                                {String.completion_date}
                            </th>
                            <th>
                                {String.status}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                1
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                2
                            </th>
                            <td>
                                Jacob
                            </td>
                            <td>
                                Thornton
                            </td>
                            <td>
                                @fat
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                3
                            </th>
                            <td>
                                Larry
                            </td>
                            <td>
                                the Bird
                            </td>
                            <td>
                                @twitter
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </Container>

        )
    }
}

export default ItemSearch;