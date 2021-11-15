import React, { useState } from 'react';
import './stemporarycss.css';
import { Button } from 'reactstrap';

import listarOSRequestManager from '../../dispatcher/listarOSRequest';
import ListFactory from './listFactory';

const tokenManager = require('../../dispatcher/tokenManager');



function App() {

    const [listItens, setListItens] = useState([{
        service_order_id: "",
        senha: "",
        owner_name: "",
        device_name: "",
        delivery_date: "",
        completion_date: "",
        status: "",
        service_value: ""
    }])
    console.log(listItens)
    const teste = e => {
        console.log("ola")
        var urlParams = new URLSearchParams({ filterType: 0, break: 2 });
        listarOSRequestManager(2, urlParams, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {
            setListItens(res.data.liste)
        });
    }

    return (

        <div>
            <Button onClick={teste}> atualisar </Button>
            <div>
                <ListFactory {...({ listItens })} />


            </div>
        </div>


    );
}

export default App;

// setListItens([{
//     service_order_id: "testando1",
//     senha: "testando1",
//     owner_name: "testando1",
//     device_name: "testando1",
//     delivery_date: "testando1",
//     completion_date: "testando1",
//     status: "testando1",
//     service_value: "testando1"
// },
// {
//     service_order_id: "testando2",
//     senha: "testando2",
//     owner_name: "testando2",
//     device_name: "testando2",
//     delivery_date: "testando2",
//     completion_date: "testando2",
//     status: "testando2",
//     service_value: "testando2"
// }
// ])