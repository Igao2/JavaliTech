import React from 'react';

const renderDefinitiveLine = (rows, password, tableColumn) => {
    console.log(tableColumn)
    return (
        <tr>
            {tableColumn.map(item => {
                console.log(item)
                if (item == "senha") {
                    console.log("ola")
                    return (<th>{password}</th>)
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
            <div>
                <table>
                    <tbody>
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
                                else return (<th>{item}</th>)
                            })}
                        </tr>

                        {this.state.hide ? line.map(item => { return this.renderLine(item, this.props.tableColumn) }) : line.map(item => { return this.renderLineHiderPassword(item, this.props.tableColumn) })}
                    </tbody>
                </table>
            </div >
        )

    }
}

export default ListFactory;