import React from 'react';
import String from '../../../../assets/values/string.json';

import { Table } from 'reactstrap';

const renderDefinitiveLine = (rows, password, tableColumn) => {
    return (
        <tr>
            {tableColumn.map(item => {
                if (item == "senha") {
                    return (<th>{password}</th>)
                }
                else if (item == "delivery_date" || item == "completion_date") {
                    return (<th>{rows[item] ? rows[item].replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}</th>)
                }
                else if (item == "status") {
                    return (<th>{String.statusType[rows[item]]}</th>)
                }
                else if (item == "service_value") {
                    var service_value = rows[item] + ".00";

                    // rows[item]([0 - 9a - zA - Z,] +).(\d{2})
                    return (<th>{rows[item] ? service_value.replace(/([0-9a-zA-Z,]+).(\d{2})(\S+)/, "$1.$2") : null}</th>)
                }
                else return (<th>{rows[item]}</th>)
            })}
        </tr>
    )
}

class ListFactory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hide: false };
    }

    renderLine(rows, tableColumn) { let password = rows.senha; return renderDefinitiveLine(rows, password, tableColumn); }

    renderLineHiderPassword(rows, tableColumn) {
        let password;
        if (rows.senha) password = "••••••";
        else password = "";
        return renderDefinitiveLine(rows, password, tableColumn);
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
            <Table
                bordered
                hover
                responsive
                size="sm"
            >
                <thead>
                    <tr>
                        {this.props.tableColumn.map(item => {
                            if (item == "senha") {
                                return (
                                    <th>
                                        senha
                                        {
                                            this.state.hide ?
                                                <img style={{ margin: "0px 10px", width: "15px" }} src="https://i.imgur.com/GI7oJZq.png" onClick={hidePassword} />
                                                :
                                                <img style={{ margin: "0px 10px", width: "15px" }} src="https://i.imgur.com/UruvGMc.png" onClick={hidePassword} />
                                        }
                                    </th>
                                )
                            }
                            else return (<th>{String.osColumns[item]}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.state.hide ? line.map(item => { return this.renderLine(item, this.props.tableColumn) }) : line.map(item => { return this.renderLineHiderPassword(item, this.props.tableColumn) })}
                </tbody>
            </Table >
        )

    }
}

export default ListFactory;