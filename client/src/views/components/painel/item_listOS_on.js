/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';
import ViewOS from './view_os';

import TableListaOS from "./listaOS/index";


class ItemListOs_On extends React.Component {
    render() {
        const breakOfPages = 7;
        const filterType = 0;
        const tableColumn = ["service_order_id", "senha", "owner_name", "device_name", "delivery_date", "completion_date", "status", "service_value"];

        return (
            <Container>
                <br />

                <h3>{String.menuListOS}</h3>
                <ItemDiv />

                <TableListaOS {...({ breakOfPages, filterType, tableColumn })} />

            </Container>

        )
    }
}

export default ItemListOs_On;