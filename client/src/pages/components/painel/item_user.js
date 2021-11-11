/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { ItemAvatar, ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';


class ItemEditUser extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col size="20px">
                        <ItemMsgUser>
                            {String.menuUserWellcome}<b>{String.menuUser}</b>
                        </ItemMsgUser>
                    </Col>
                </Row>
                <ItemDiv />
                <Row md="2" sm="2" xs="1" >
                    <Col size="200px">
                        <ItemColAvatar>
                            <ItemAvatar src={avatarTMP} />
                        </ItemColAvatar>
                    </Col>
                    <Col>
                        <ItemColText>
                            <p>
                                {String.itemInfo01} {String.itemInfo01_tmp}
                                <br />
                                {String.itemInfo02} {String.itemInfo02_tmp}
                                <br />
                                {String.itemInfo03} {String.itemInfo03_tmp}

                            </p>
                        </ItemColText>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ItemMsgUser>
                            {String.itemCalendar}
                        </ItemMsgUser>

                        <ItemDiv />
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Table heading
                                    </th>
                                    <th>
                                        Table heading
                                    </th>
                                    <th>
                                        Table heading
                                    </th>
                                    <th>
                                        Table heading
                                    </th>
                                    <th>
                                        Table heading
                                    </th>
                                    <th>
                                        Table heading
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        1
                                    </th>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        2
                                    </th>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        3
                                    </th>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                    <td>
                                        Table cell
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default ItemEditUser;