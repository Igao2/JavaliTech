import React from 'react';
import './temporarycss.css';

import { Container, Header, BodyMain } from '../../style/style';

function App() {
    return (

        <Container>
            <Header>
                <input type="text"
                    maxLength="6"
                    placeholder="*definir placeholder*"
                    name='searchText'
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
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>



    );
}

export default App;