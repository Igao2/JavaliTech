/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { ItemDiv } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'reactstrap';


import TableListaOS from "./listaOS/index";


class ItemListOs_On extends React.Component {
    render() {

        /** const que armazena o número de linhas que a tabela vai ter. */
        const breakOfPages = 10;

        /** const que armazena o tipo de filtro que irá ser usado para selecionar as OS's presentes na tabela. */
        const filterType = 0;

        /** const que armazena um array com as colinas presentes na tabela. */
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