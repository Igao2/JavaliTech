import React, { useState, useEffect } from 'react';

import listOSRequestManager from '../../../../dispatcher/listOSRequest';
import ListFactory from './listFactory';

const tokenManager = require('../../../../dispatcher/tokenManager');


function App(props) {

    const breakOfPages = props.breakOfPages;
    const filterType = props.filterType;
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
        var urlParams = new URLSearchParams({ filterType: filterType, break: breakOfPages });

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
        <div>
            <ListFactory {...({ listItens, tableColumn })} />

            {pages.map(item => (
                <ul>
                    {item == currentPage && <li onClick={changeThePage} style={{ color: "red", cursor: "pointer" }}>{item}</li>}
                    {item != currentPage && <li onClick={changeThePage} style={{ cursor: "pointer" }}>{item}</li>}
                </ul>
            ))}
        </div>
    );
}

export default App;