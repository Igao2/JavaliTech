import React, { useState } from 'react';

class ListFactory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hide: false };
    }

    renderLine(rows) {
        return (
            <tr>
                <th>{rows.service_order_id}</th>
                <th>{rows.senha}</th>
                <th>{rows.owner_name}</th>
                <th>{rows.device_name}</th>
                <th>{rows.delivery_date}</th>
                <th>{rows.completion_date}</th>
                <th>{rows.status}</th>
                <th>{rows.service_value}</th>
            </tr>
        )
    }

    renderLineHiderPassword(rows) {
        let password;
        if (rows.senha) password = "••••••";
        else password = "";
        return (
            <tr>
                <th>{rows.service_order_id}</th>
                <th>{password}</th>
                <th>{rows.owner_name}</th>
                <th>{rows.device_name}</th>
                <th>{rows.delivery_date}</th>
                <th>{rows.completion_date}</th>
                <th>{rows.status}</th>
                <th>{rows.service_value}</th>
            </tr>
        )
    }

    render() {


        let line = [];

        for (let i = 0; i < this.props.listItens.length; i++)
            line.push(this.props.listItens[i])

        const hidePassword = () => {
            this.setState((state) => {
                if (state.hide) return { hide: 0 };
                else return { hide: 1 };
            })
        }
        return (
            <div>

                <table>
                    <tbody>
                        <tr>
                            <th>service_order_id</th>
                            <th>
                                senha
                                {
                                    this.state.hide ?
                                        <img style={{ margin: "0px 10px", width: "15px" }} src="https://i.imgur.com/GI7oJZq.png" onClick={hidePassword} />
                                        :
                                        <img style={{ margin: "0px 10px", width: "15px" }} src="https://i.imgur.com/UruvGMc.png" onClick={hidePassword} />
                                }
                            </th>
                            <th>owner_name</th>
                            <th>device_name</th>
                            <th>delivery_date</th>
                            <th>completion_date</th>
                            <th>status</th>
                            <th>service_value</th>
                        </tr>

                        {this.state.hide ? line.map(this.renderLine) : line.map(this.renderLineHiderPassword)}
                    </tbody>
                </table>

            </div >
        )

    }
}

export default ListFactory;