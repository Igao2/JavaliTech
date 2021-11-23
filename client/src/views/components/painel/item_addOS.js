/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import String from '../../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemColText, ItemColTextOS, ItemDiv, ItemMsgUser, QuadrosOS, ProfilePhoto } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import avatarBackground from '../../../assets/images/icons/backgroundAvatar.png';
import createOsManager from '../../../dispatcher/createOs';

import avatarTMP from '../../../assets/images/tmp/avartar_tmp.jpg';


const tokenManager = require('../../../dispatcher/tokenManager');

function App(props) {
    /** const useState para alertar errors, warnings, informs e etc... */
    const [announcement, setAnnouncement] = useState({
        enabled: 0,
        type: "",
        massage: ""
    })

    /** const useState ativar e desativar a gif de loading do botão de cadastrar-se. */
    const [loading, setLoading] = useState(0);

    let senha = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++)
        senha += possible.charAt(Math.floor(Math.random() * possible.length));


    /** const useState para os Inputs do formulario de cadatro  */
    const [osInfos, setOsInfos] = useState({
        senha: senha,
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

    /** const useState para o redirecionamento de tela. */
    const redirect = useState(0);

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

    /**
    * Esta arrow function pega o valor dos Inputs do form e armazena no useState "register", ele tambem implementa mascaras nos inputs telephone e cep.
    * @param {object} event - Informações do evento onChange.
    * @param {string} event.target.value - valor do input.
    * @param {string} event.target.name - nome do input.
    */
    const createOs = event => {
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

            /** Faz a requisição para a API com os dados do novo usuarido, para que ele possa ser cadastrado.
            * @param {object} request - Dados do novo usuarido.
            * @param {object} res - Resposta da API.
            */
            createOsManager(request, headers).then(res => {

                if (res.data.erro) {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
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
                                massage: String.error500mensagem
                            })
                    }
                } else {
                    setAnnouncement({
                        enabled: 1,
                        type: "info",
                        massage: res.data.mensagem
                    })
                    setInputState({ ...1 })
                }

                setLoading(0)
            }).catch(error => {
                setAnnouncement({
                    enabled: 1,
                    type: "danger",
                    massage: String.error500
                })
                setLoading(0)
            });

        } else setLoading(0)

        console.log(inputNames)


    }

    return (
        <Container>
            <br />
            {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
            {announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}
            <h3>{String.menuAddOS}</h3>
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
                            <h6>{String.osPassAcess}:</h6>
                            <h2>{osInfos.senha}</h2>
                        </ItemColAvatar>
                    </Col>
                </Row>
            </QuadrosOS>
            <Form onSubmit={createOs}>
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
                                    type="text"
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
                                    type="text"
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
                                {String.status_init}
                            </option>
                            <option value="2">
                                {String.status_pause}
                            </option>
                            <option value="3">
                                {String.status_stop}
                            </option>
                            <option value="4">
                                {String.status_finish}
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


        </Container>

    )
}


export default App;