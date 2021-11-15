/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';
import ViewOS from './view_os';


class ItemListOs_On extends React.Component {
    render() {
        return (
            <Container>
                <br />

                <h3>{String.menuListOS}</h3>
                <ItemDiv />
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

export default ItemListOs_On;