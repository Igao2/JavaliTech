/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { ItemDiv } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'reactstrap';


import TableListaOS from "./listaOS/index";


class ItemListOs_On extends React.Component {
    render() {
        const breakOfPages = 10;
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