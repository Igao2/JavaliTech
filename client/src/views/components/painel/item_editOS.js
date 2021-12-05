/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemColAvatar, ItemColTextOS, QuadrosOS, ProfilePhoto } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Alert, Form, FormGroup, Input, Button } from 'reactstrap';
import avatarBackground from '../../../assets/images/icons/backgroundAvatar.png';
import editOsManager from '../../../dispatcher/editOs';

import { Redirect, useParams } from "react-router-dom";

import osInfosResultManager from '../../../dispatcher/osInfosRequest';
import deleteOsManager from '../../../dispatcher/deleteOs';


const tokenManager = require('../../../dispatcher/tokenManager');

/**
 * @function Components-Painel-Edit_OS
 * @description Componente que gera o formulário para editar ou deletar uma OS existente
 */
function App(props) {

    /** Parametros da OS */
    let { item1, item2 } = useParams();
    const osId = item1;
    const osPass = item2;

    /** const useState para alertar errors, warnings, informs e etc... */
    const [announcement, setAnnouncement] = useState({
        enabled: 0,
        type: "",
        massage: ""
    })

    /** const useState para o redirecionamento para a tela de erro 400. */
    const redirect400 = useState(0);

    /** const useState para o redirecionamento para a tela de erro 500. */
    const redirect500 = useState(0);

    /** const useState ativar e desativar a gif de loading do botão de submit. */
    const [loading, setLoading] = useState(0);


    /** const useState para os Inputs do formulario.  */
    const [osInfos, setOsInfos] = useState({
        serviceOrderId: osId,
        senha: osPass,
        ownerInformation: "",
        ownerName: "",
        description: "",
        deviceName: "",
        deliveryDate: "",
        completionDate: "",
        status: 1,
        serviceValue: ""
    });

    /** const useState para definir os status dos campos. */
    const [inputState, setInputState] = useState({
        ownerInformation: 0,
        ownerName: 0,
        description: 0,
        deviceName: 0,
        deliveryDate: 0,
        completionDate: 0,
        status: 0,
        serviceValue: 0
    });

    /** useEffect que obtém as informações da OS = é executado a página carrega, obtém as informações da OS a ser alterada. */
    useEffect(() => {

        osInfosResultManager(osId, osPass).then(res => {
            switch (res.data) {
                case 500: redirect500[1](1); break;

                case 400: redirect400[1](1); break;

                case 401: redirect400[1](1); break;

                case 417: redirect400[1](1); break;

                case 204: redirect400[1](1); break;

                default: {
                    function dataFomater(data) {
                        if (data != null) {
                            return data.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$1-$2-$3");
                        } else return null;
                    }
                    setOsInfos({
                        serviceOrderId: osId,
                        senha: osPass,
                        ownerInformation: res.data.owner_information,
                        ownerName: res.data.owner_name,
                        description: res.data.description,
                        deviceName: res.data.device_name,
                        deliveryDate: dataFomater(res.data.delivery_date),
                        completionDate: dataFomater(res.data.completion_date),
                        status: res.data.status,
                        serviceValue: "R$ " + res.data.service_value
                    })
                }
            }
        }).catch(error => {
            redirect500[1](1);
        });

    }, []);

    /** Esta arrow function pega o valor dos Inputs do form e armazena no useState "osInfos", ele tambem implementa mascara no campo serviceValue.
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

            setOsInfos({ ...osInfos, [event.target.name]: value });
        }
        setInputState({ ...0 })
        setOsInfos({ ...osInfos, [event.target.name]: value });

        setAnnouncement({ ..."", enabled: 0 })
    }

    /** Esta arrow function pega o valor dos Inputs do form e altera a OS.
    * @param {object} event - Informações do evento onChange.
    * @param {string} event.target.value - valor do input.
    * @param {string} event.target.name - nome do input.
    */
    const editOs = event => {
        event.preventDefault();
        setLoading(1);

        var valid = true;

        const inputNames = {
            "ownerInformation": "\"" + String.ownerInformation + "\"",
            "ownerName": "\"" + String.ownerName + "\"",
            "description": "\"" + String.description + "\"",
            "deviceName": "\"" + String.deviceName + "\"",
            "deliveryDate": "\"" + String.deliveryDate + "\"",
            "completionDate": "\"" + String.completionDate + "\"",
            "status": "\"" + String.osOsProcess + "\"",
            "serviceValue": "\"" + String.serviceValue + "\""
        }

        function turnToError() {
            let inputState = {};
            for (let i = 0; i < (event.target.length - 1); i++)
                inputState[event.target[i].name] = 2;
            setInputState(inputState)
        }

        function turnToSuccess() {
            let inputState = {};
            for (let i = 0; i < (event.target.length - 1); i++)
                inputState[event.target[i].name] = 1;
            setInputState(inputState)
        }

        for (let i = 0; i < (event.target.length - 1); i++) {
            if (event.target[i].name != "completionDate" && event.target[i].name != "deliveryDate") {
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
                    inputState[event.target[i].name] = 2;
                    valid = false;
                }
            }
        }

        if (valid) {

            var request = {
                serviceOrderId: "",
                senha: "",
                ownerInformation: "",
                ownerName: "",
                description: "",
                deviceName: "",
                deliveryDate: "",
                completionDate: "",
                status: "",
                serviceValue: ""
            }
            request = { ...osInfos };
            request.serviceValue = parseFloat(request.serviceValue.slice(3));

            var headers = { headers: { authentication: "Bearer " + tokenManager.readToken() } };

            /** Faz a requisição para a API com os novos dados da OS.
            * @param {object} request - Dados da OS.
            * @param {object} res - Resposta da API.
            */
            editOsManager(request, headers).then(res => {

                if (res.data.erro) {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            turnToError();
                            break;

                        case 400:
                            for (let i = 0; i < res.data.erroDetails.length; i++) {
                                setAnnouncement({
                                    enabled: 1,
                                    type: "warning",
                                    massage: res.data.erroDetails[i].mensagem
                                })
                                inputState[res.data.erroDetails[i].campo] = 2;
                            }
                            break;

                        default:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            turnToError();

                    }
                } else {
                    setAnnouncement({
                        enabled: 1,
                        type: "info",
                        massage: res.data.mensagem
                    })
                    setInputState({ ...1 })

                    turnToSuccess();
                }

                setLoading(0)
            }).catch(error => {
                setAnnouncement({
                    enabled: 1,
                    type: "danger",
                    massage: String.error500
                })
                setLoading(0)
                turnToError();
            });

        } else setLoading(0)
    }

    /** Esta arrow function deleta a OS. */
    const DeleteOs = e => {
        deleteOsManager(osId, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {
            window.location.assign(window.location.href.split("#")[0].replace(`${window.location.pathname}`, "") + "/painel")
        })
    }

    return (
        <Container>
            {redirect400[0] ? <Redirect to='/alert/T400/D400' /> : null}
            {redirect500[0] ? <Redirect to='/alert/T500/D500' /> : null}
            <br />
            {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
            {announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

            <h3>{String.menuEditOS}</h3>
            <QuadrosOS>
                <h6>{String.osInfoBasic}: </h6>
                <Row md="3" sm="3" xs="1">
                    <Col>
                        <ItemColAvatar>
                            <ProfilePhoto imgUrl={avatarBackground}>

                                <img
                                    src={props.userInfos.photo[0]}
                                    alt="Imagem"
                                    style={{
                                        left: props.userInfos.photo[1].left + "px",
                                        top: props.userInfos.photo[1].top + "px",
                                        width: props.userInfos.photo[1].width + "%"
                                    }}
                                />

                            </ProfilePhoto>

                        </ItemColAvatar>
                    </Col>
                    <Col>
                        <ItemColTextOS>
                            <p>
                                <h2>{props.userInfos.name}</h2>
                                {props.userInfos.address.rua}, {props.userInfos.address.bairro}, {props.userInfos.address.cidade}, {props.userInfos.address.estado}
                                <br /><br />
                                {props.userInfos.telephone}
                                <br />
                                {props.userInfos.email}
                            </p>
                        </ItemColTextOS>
                    </Col>
                    <Col>
                        <ItemColAvatar>
                            <h6>{String.osCodeAcess}:</h6>
                            <h4>{osId}</h4>
                            <h6>{String.osPassAcess}:</h6>
                            <h4>{osPass}</h4>
                        </ItemColAvatar>
                    </Col>
                </Row>
            </QuadrosOS>

            <Form onSubmit={editOs}>
                <QuadrosOS>
                    <h6>{String.osCATinfo}:</h6>
                    <FormGroup>
                        <Input
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.ownerName)}
                            id="ownerName"
                            name="ownerName"
                            type="text"
                            placeholder={String.owner_name}
                            value={osInfos.ownerName}
                            onChange={onChangeEvent}
                        />
                        <br />
                        <Input
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.ownerInformation)}
                            id="ownerInformation"
                            name="ownerInformation"
                            type="textarea"
                            value={osInfos.ownerInformation}
                            placeholder={String.owner_information}
                            onChange={onChangeEvent}
                        />
                    </FormGroup>
                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osInfoService}: </h6>
                    <FormGroup>
                        <Input
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.description)}
                            id="description"
                            name="description"
                            type="textarea"
                            value={osInfos.description}
                            placeholder={String.description}
                            onChange={onChangeEvent}
                        />
                        <br />
                        <Input
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.deviceName)}
                            id="deviceName"
                            name="deviceName"
                            type="text"
                            placeholder={String.device_name}
                            value={osInfos.deviceName}
                            onChange={onChangeEvent}
                        />
                        <Row md="2" sm="2" xs="1">
                            <Col>
                                <br />
                                <Input
                                    className={(state => {
                                        if (state == 0) return ("")
                                        else if (state == 1) return ("is-valid")
                                        else if (state == 2) return ("is-invalid")
                                    })(inputState.deliveryDate)}
                                    id="deliveryDate"
                                    name="deliveryDate"
                                    type="date"
                                    value={osInfos.deliveryDate}
                                    onFocus={e => { e.currentTarget.type = "date"; }}
                                    placeholder={String.delivery_date}
                                    onChange={onChangeEvent}
                                />
                            </Col>
                            <Col>
                                <br />
                                <Input
                                    className={(state => {
                                        if (state == 0) return ("")
                                        else if (state == 1) return ("is-valid")
                                        else if (state == 2) return ("is-invalid")
                                    })(inputState.completionDate)}
                                    id="completionDate"
                                    name="completionDate"
                                    type="date"
                                    locate="pt-br"
                                    value={osInfos.completionDate}
                                    onFocus={e => { e.currentTarget.type = "date"; }}
                                    placeholder={String.completion_date}
                                    onChange={onChangeEvent}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Input
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.serviceValue)}
                            id="serviceValue"
                            name="serviceValue"
                            type="text"
                            value={osInfos.serviceValue}
                            placeholder={String.service_value}
                            onChange={onChangeEvent}
                        />
                    </FormGroup>
                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osOsProcess}: </h6>
                    <FormGroup>
                        <Input
                            className={(state => {
                                if (state == 0) return ("mb-3")
                                else if (state == 1) return ("mb-3 is-valid")
                                else if (state == 2) return ("mb-3 is-invalid")
                            })(inputState.status)}
                            type="select"
                            onChange={onChangeEvent}
                            name="status"
                            value={osInfos.status}
                        >
                            <option value="0">
                                {String.stauts_wait}
                            </option>
                            <option value="1">
                                {String.status_finish}
                            </option>
                            <option value="2">
                                {String.status_init}
                            </option>
                            <option value="3">
                                {String.status_pause}
                            </option>
                        </Input>

                    </FormGroup>
                </QuadrosOS>
                <QuadrosOS>
                    <h6>{String.osAdd}</h6>
                    {loading ?
                        <Button block color="dark" type="submit"><img style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                        :
                        <Button block color="dark" type="submit">{String.save}</Button>
                    }
                </QuadrosOS>
            </Form>

            <QuadrosOS>
                <AlertDelet>

                    <h4>{String.userDelteCount}? </h4>
                    <Button
                        block
                        color="danger"
                        onClick={DeleteOs}
                    >
                        {String.delete}
                    </Button>
                </AlertDelet>
            </QuadrosOS>


        </Container >

    )
}


export default App;