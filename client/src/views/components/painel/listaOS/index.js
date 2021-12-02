import React, { useState, useEffect } from 'react';

import listOSRequestManager from '../../../../dispatcher/listOSRequest';
import ListFactory from './listFactory';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationRed } from "../../../../assets/values/styles";

const tokenManager = require('../../../../dispatcher/tokenManager');


function App(props) {

    const breakOfPages = props.breakOfPages;
    const filterType = props.filterType;
    let tmpDado;
    if (!props.filterData) tmpDado = "";
    else tmpDado = props.filterData;
    const dado = tmpDado;
    const tableColumn = props.tableColumn;

    let nullListItens = {
        service_order_id: "",
        senha: "",
        owner_name: "",
        device_name: "",
        delivery_date: "",
        completion_date: "",
        status: "",
        service_value: ""
    }
    let initListItens = [];

    for (let i = 0; i < breakOfPages; i++) initListItens[i] = nullListItens;

    const [listItens, setListItens] = useState(initListItens)
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);

    const listarOS = () => {
        var urlParams = new URLSearchParams({ filterType: filterType, break: breakOfPages, dado: dado });

        listOSRequestManager(currentPage, urlParams, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {
            setListItens(res.data.liste);

            let newPages = []

            for (let i = 1; i <= res.data.numberOfPages; i++) newPages[i] = i;


            setPages(newPages);
        });
    }

    const changeThePage = e => { setCurrentPage(parseInt(e.target.innerText)); }

    useEffect(() => { listarOS(); }, [currentPage]);

    return (
        <PaginationRed>
            <ListFactory {...({ listItens, tableColumn })} />

            <Pagination aria-label="Page navigation example">

                {pages.map(item => (
                    <PaginationItem active={item == currentPage && true} onClick={changeThePage}>
                        <PaginationLink>
                            {item}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </Pagination>

        </PaginationRed>
    );
}

export default App;