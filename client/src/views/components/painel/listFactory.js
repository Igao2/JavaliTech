import React from 'react';
import String from '../../../assets/values/string.json';
import { Table } from 'reactstrap';

/**
 * @class
 * @description Esta class cria a tabela de OS's
 */
class ListFactory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hide: false };
    }

    /** método que que inicia a renderização das linhas da tabela separadamente */
    renderLine(rows, tableColumn) { let password = rows.senha; return this.renderDefinitiveLine(rows, password, tableColumn); }

    /** método que que inicia a renderização das linhas da tabela separadamente, porém com o campo de senha escondido */
    renderLineHiderPassword(rows, tableColumn) {
        let password;
        if (rows.senha) password = "••••••";
        else password = "";
        return this.renderDefinitiveLine(rows, password, tableColumn);
    }

    /** método que que renderiza cada linha */
    renderDefinitiveLine(rows, password, tableColumn) {
        var dir;

        if (rows.service_order_id == "") dir = '/painel';
        else dir = '/painel/' + rows.service_order_id + '/' + rows.senha + "#8";

        const redirect = () => { window.location.assign(window.location.href.split("#")[0].replace(`${window.location.pathname}`, "") + dir) };

        return (
            <tr onClick={redirect}>
                {tableColumn.map(item => {

                    if (item === "senha") {
                        return (<th>{password}</th>)
                    }
                    else if (item === "delivery_date" || item === "completion_date") {
                        return (<th>{rows[item] ? rows[item].replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}</th>)
                    }
                    else if (item === "status") {
                        return (<th>{String.statusType[rows[item]]}</th>)
                    }
                    else if (item === "service_value") {
                        var service_value = rows[item] + ".00";

                        return (<th>R$: {rows[item] ? service_value.replace(/([0-9a-zA-Z,]+).(\d{2})(\S+)/, "$1.$2") : null}</th>)
                    }
                    else return (<th>{rows[item]}</th>)
                })}
            </tr>
        )
    }

    /** método que que renderiza a tabela */
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
                            if (item === "senha") {
                                return (
                                    <th>
                                        senha
                                        {
                                            this.state.hide ?
                                                <img alt="hideEye.png" style={{ margin: "0px 10px", width: "15px" }} src="https://i.imgur.com/GI7oJZq.png" onClick={hidePassword} />
                                                :
                                                <img alt="hideEye.png" style={{ margin: "0px 10px", width: "15px" }} src="https://i.imgur.com/UruvGMc.png" onClick={hidePassword} />
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