/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useState } from 'react';
import String from '../../../assets/values/string.json';

import { QuadrosOS } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Form, FormGroup, Input, Button, Alert } from 'reactstrap';

import TableListaOS from "./table_list_os";

/**
 * @function Components-Painel-search
 * @description Componente que gera uma tela de busca por OS através de filtro
 */
function App() {

    /** const que armazena o número de linhas que a tabela vai ter. */
    const breakOfPages = 3;

    /** const useState que armazena o tipo de filtro que irá ser usado para selecionar as OS's presentes na tabela. */
    var [filterType, setFilterType] = useState(0);

    /** const useState que armazena o valor referente ao dado que ira ser utilizado na filtragem de OS's presentes na tabela. */
    var [filterData, setFilterData] = useState("");

    /** const que armazena um array com as colinas presentes na tabela. */
    const tableColumn = ["service_order_id", "senha", "owner_name", "device_name", "delivery_date", "status"];

    /** const useState para definir os status dos campos. */
    const [inputState, setInputState] = useState({
        select: 0,
        dado: 0
    });

    /** const useState para alertar errors, warnings, informs e etc... */
    const [announcement, setAnnouncement] = useState({
        enabled: 0,
        type: "",
        massage: ""
    })


    /** const useState ativar e desativar a gif de loading do botão de submit. */
    const [loading, setLoading] = useState(0);

    /** const useState ativar e desativar a gif de loading da tabela */
    const [loadingTable, setLoadingTable] = useState(0);

    /** const useState para o Inputs[select] do formulario de busca OS.  */
    const [select, setSelect] = useState(0);

    /** const useState para os Inputs de dados de filtro do formulario de busca OS.  */
    const [dado, setDado] = useState("");

    /** Esta arrow function pega o valor dos Inputs do form e armazena no useState "dado", ele tambem implementa mascara no campo serviceValue.
    * @param {object} event - Informações do evento onChange.
    * @param {string} event.target.value - valor do input.
    * @param {string} event.target.name - nome do input.
    */
    const onChangeEvent = event => {
        var value = event.target.value;

        function cleanMask(number) {
            if (number == "") return "0";
            number = number.replace(/[A-Z]/gi, '');
            number = number.replace(/[^a-z0-9]/gi, '');
            number = number.replace(/\-/g, '');
            number = number.replace(/ /g, '');
            return number;
        }

        if (event.target.name == "serviceValue") {
            value = parseInt(cleanMask(value)) + "";

            if (value.length > 3)
                value = "R$ " + value.slice(0, - 2) + "." + value.slice(-2);
            else if (value.length == 3)
                value = "R$ 0" + value.slice(0, - 2) + "." + value.slice(-2);
            else if (value.length == 2)
                value = "R$ 00." + value;
            else
                value = "R$ 00.0" + value;

            setDado(value);
        }
        setInputState({ ...0 })
        setDado(value);
        setAnnouncement({
            enabled: 0,
            type: "",
            massage: ""
        })

    }

    /** Esta arrow function resliza a busca da OS usando os filtros passados.
    * @param {object} event - Informações do evento onChange.
    * @param {string} event.target.value - valor do input.
    * @param {string} event.target.name - nome do input.
    */
    const searchOs = event => {
        event.preventDefault();
        setLoading(1);

        var valid = true;

        const inputNames = {
            "select": "\"" + String.filtroOs + "\"",
            "ownerInformation": "\"" + String.owner_information + "\"",
            "ownerName": "\"" + String.owner_name + "\"",
            "description": "\"" + String.description + "\"",
            "deviceName": "\"" + String.device_name + "\"",
            "deliveryDate": "\"" + String.delivery_date + "\"",
            "completionDate": "\"" + String.completion_date + "\"",
            "status": "\"" + String.osOsProcess + "\"",
            "serviceValue": "\"" + String.service_value + "\""
        }

        for (let i = 0; i < (event.target.length - 1); i++) {
            if (event.target[i].value == "") {
                if (!valid)
                    setAnnouncement({
                        enabled: 1,
                        type: "warning",
                        massage: "Alguns campos estão vazios"
                    })
                else
                    setAnnouncement({
                        enabled: 1,
                        type: "warning",
                        massage: "O campo " + inputNames[event.target[i].name] + " esta vazio"
                    })

                if (event.target[i].name === "select") inputState.select = 2;
                else inputState.dado = 2;
                valid = false;
            }
        }

        if (valid) {

            if (event.target[0].value === "0") {
                setLoadingTable(1)
                setFilterType(event.target[1].value)
                setFilterData("")
                setInterval(() => {
                    setLoadingTable(0)
                    setLoading(0)
                }, 1200);
            } else {
                setLoadingTable(1)
                setFilterType(event.target[0].value)
                if (event.target[0].value === "8") setFilterData(parseFloat(event.target[1].value.slice(3)))
                else setFilterData(event.target[1].value);
                setInterval(() => {
                    setLoadingTable(0)
                    setLoading(0)
                }, 1200);
            }

        } else setLoading(0)

    }

    return (
        <Container>
            {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
            {announcement.enabled ? (<> <br /> <Alert color={announcement.type} dismissible>{announcement.massage}</Alert></>) : null}
            <br />

            <h3>{String.search_OS}</h3>

            <QuadrosOS>
                <Form onSubmit={searchOs}>
                    <FormGroup>
                        <h6>{String.filtroOs}</h6>
                        <Input
                            className={(state => {
                                if (state == 0) return ("mb-3")
                                else if (state == 1) return ("mb-3 is-valid")
                                else if (state == 2) return ("mb-3 is-invalid")
                            })(inputState.select)}
                            type="select"
                            onChange={e => { setInputState({ ...0 }); setDado(""); setSelect(e.target.value) }}
                            name="select"
                            value={select}
                        >
                            <option value="0">
                                {String.filtro_status}
                            </option>

                            <option value="5">
                                {String.filtro_owner_name}
                            </option>

                            <option value="6">
                                {String.filtro_device_name}
                            </option>

                            <option value="7">
                                {String.filtro_delivery_date}
                            </option>

                            <option value="8">
                                {String.filtro_service_value}
                            </option>
                        </Input>
                        <br />
                        {select == 0 &&
                            (
                                <div>
                                    <h6>{String.osOsProcess}:</h6>
                                    <Input
                                        className={(state => {
                                            if (state == 0) return ("mb-3")
                                            else if (state == 1) return ("mb-3 is-valid")
                                            else if (state == 2) return ("mb-3 is-invalid")
                                        })(inputState.dado)}
                                        type="select"
                                        onChange={onChangeEvent}
                                        name="status"
                                        value={dado}
                                    >
                                        <option value="1">
                                            {String.stauts_wait}
                                        </option>
                                        <option value="2">
                                            {String.status_finish}
                                        </option>
                                        <option value="3">
                                            {String.status_init}
                                        </option>
                                        <option value="4">
                                            {String.status_pause}
                                        </option>
                                    </Input>
                                </div>
                            )
                        }
                        {select == 5 &&
                            (
                                <div>
                                    <h6>{String.owner_name}:</h6>
                                    <Input
                                        className={(state => {
                                            if (state == 0) return ("mb-3")
                                            else if (state == 1) return ("mb-3 is-valid")
                                            else if (state == 2) return ("mb-3 is-invalid")
                                        })(inputState.dado)}
                                        type="texte"
                                        onChange={onChangeEvent}
                                        name="ownerName"
                                        value={dado}
                                    />
                                </div>
                            )
                        }
                        {select == 6 &&
                            (
                                <div>
                                    <h6>{String.device_name}:</h6>
                                    <Input
                                        className={(state => {
                                            if (state == 0) return ("mb-3")
                                            else if (state == 1) return ("mb-3 is-valid")
                                            else if (state == 2) return ("mb-3 is-invalid")
                                        })(inputState.dado)}
                                        type="texte"
                                        onChange={onChangeEvent}
                                        name="deviceName"
                                        value={dado}
                                    />
                                </div>
                            )
                        }
                        {select == 7 &&
                            (
                                <div>
                                    <h6>{String.delivery_date}:</h6>
                                    <Input
                                        className={(state => {
                                            if (state == 0) return ("mb-3")
                                            else if (state == 1) return ("mb-3 is-valid")
                                            else if (state == 2) return ("mb-3 is-invalid")
                                        })(inputState.dado)}
                                        type="date"
                                        onChange={onChangeEvent}
                                        name="deliveryDate"
                                        value={dado}
                                    />
                                </div>
                            )
                        }
                        {select == 8 &&
                            (
                                <div>
                                    <h6>{String.service_value}:</h6>
                                    <Input
                                        className={(state => {
                                            if (state == 0) return ("mb-3")
                                            else if (state == 1) return ("mb-3 is-valid")
                                            else if (state == 2) return ("mb-3 is-invalid")
                                        })(inputState.dado)}
                                        type="text"
                                        onChange={onChangeEvent}
                                        name="serviceValue"
                                        value={dado}
                                    />
                                </div>
                            )
                        }

                    </FormGroup>
                    {loading ?
                        <Button block color="dark" type="submit"><img style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                        :
                        <Button block color="dark" type="submit">{String.search}</Button>
                    }

                </Form>
            </QuadrosOS>
            {loadingTable ?
                <div style={{ width: "100%", display: "flex", justifyContent: "center", backgroundColor: "#efefef" }}>
                    <img style={{ width: "25%", filter: "invert(0.89)" }} src="https://i.imgur.com/TRbq1bq.gif" />
                </div>
                :
                <TableListaOS {...({ breakOfPages, filterType, tableColumn, filterData })} />
            }

        </Container>

    )
}


export default App;