import React, { useState } from 'react';
import { Container, Header, BodyMain } from '../../style/style';
import './temporarycss.css';

import searchResultManager from '../../dispatcher/searchBarRequest';



function App() {

    var searchBar;
    useState(searchBar);
    const [value, setValue] = useState({
        "service_order_id": "",
        "owner_name": "",
        "description": "",
        "device_photos": "",
        "delivery_date": "",
        "completion_date": "",
        "status": "",
        "service_value": "",
        "user_name": "",
        "user_photo": ""
    });

    const onChangeEvent = event => {
        let code = event.target.value.toUpperCase();
        event.target.value = code;

        if (code.length === 6) {
            searchResultManager(code).then(res => {
                if (res.data === 204) alert("OS não existe")
                else if (res.data === 417) alert("OS corronpida")
                else if (res.data === 500) alert("Erro de sistema")
                else setValue(res.data)
            });
        } else
            setValue({ ...null, "user_photo": ["", ""] });

    }

    // O css da tabela está no arquivo "temporarycss.css", é um css de teste só pra não ficar tão ilegível como estava.
    // Quando o layout legitimo for criado esse css deve ser previsto para evitar problemas futuros.
    return (

        <Container>
            <Header>
                <input type="text"
                    maxLength="6"
                    placeholder="definir placeholder"
                    name='searchText'
                    value={searchBar}
                    onChange={onChangeEvent}
                />
            </Header>


            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>service_order_id</th>
                            <th>owner_name</th>
                            <th>description</th>
                            <th>device_photos</th>
                            <th>delivery_date</th>
                            <th>completion_date</th>
                            <th>status</th>
                            <th>service_value</th>
                            <th>user_name</th>
                            <th>user_photo</th>
                        </tr>

                        <tr>
                            <th>{value.service_order_id}</th>
                            <th>{value.owner_name}</th>
                            <th>{value.description}</th>
                            <th>{value.device_photos}</th>
                            <th>{value.delivery_date}</th>
                            <th>{value.completion_date}</th>
                            <th>{value.status}</th>
                            <th>{value.service_value}</th>
                            <th>{value.user_name}</th>
                            <th>
                                <img width="50" src={value.user_photo[0]} />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>
    );
}

export default App;