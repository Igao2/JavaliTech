/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import String from '../../../assets/values/string.json';

import {
    AlertDelet, ItemColAvatar,
    ItemDiv, ProfilePhoto, LocateButton
} from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';
import updateInfosManager from '../../../dispatcher/updateInfos';

import { Col, Row, Container, Form, FormGroup, Input, Button, Alert } from 'reactstrap';


import avatarBackground from '../../../assets/images/icons/backgroundAvatar.png';
import { Redirect } from "react-router-dom";

const tokenManager = require('../../../dispatcher/tokenManager');

function App(props) {

    /** const useState para o redirecionamento de tela. */
    const redirect = useState(0);

    /** const useState para alertar errors, warnings, informs e etc... */
    const [announcement, setAnnouncement] = useState({
        enabled: 0,
        type: "",
        massage: ""
    });

    /** const useState ativar e desativar a gif de loading do botão de cadastrar-se. */
    const [loading, setLoading] = useState([0, 0, 0, 0]);

    /** const useState para definir os status dos campos. */
    const [inputState, setInputState] = useState({
        name: 0,
        email: 0,
        newPass: 0,
        otherPass: 0,
        telephone: 0,
        cep: 0,
        numero: 0,
        complemento: 0,
        bairro: 0,
        cidade: 0,
        estado: 0,
        image: 0
    });

    /** const useState para o Input "image" */
    const [image, setImage] = useState('');

    /** const useState para os imageSettings da imagem */
    const [imagePreview, setPreview] = useState({
        left: props.userInfos.photo[1].left,
        top: props.userInfos.photo[1].top,
        width: props.userInfos.photo[1].width
    });

    /** const useState para os Inputs do formulario altera email  */
    const [email, setEmail] = useState(props.userInfos.email);

    const initDados = {
        name: props.userInfos.name,
        telephone: props.userInfos.telephone,
        rua: props.userInfos.address.rua,
        cep: props.userInfos.address.cep,
        numero: props.userInfos.address.numero,
        complemento: props.userInfos.address.complemento,
        bairro: props.userInfos.address.bairro,
        cidade: props.userInfos.address.cidade,
        estado: props.userInfos.address.estado
    }

    const [dados, setDados] = useState(initDados);

    const [password, setPassword] = useState({
        newPass: "",
        otherPass: ""
    });

    const inputNames = {
        "name": "\"Nome\"",
        "email": "\"Email\"",
        "newPass": "\"Nova senha\"",
        "otherPass": "\"Repetir senha\"",
        "telephone": "\"Telefone\"",
        "image": "\"Imagem\"",
        "cep": "\"Cep\"",
        "numero": "\"Numero\"",
        "complemento": "\"Complemento\"",
        "bairro": "\"Bairro\"",
        "cidade": "\"Cidade\"",
        "estado": "\"Estado\"",
        "rua": "\"Rua\""
    }

    /**
    * Essa função cria a dinâmica de ajuste da posição de imagem, podendo aumentar, diminuir, mover para a esquerda ou para a direita e também podendo movê-la para cima e para baixo.
    * @param {number} type - Determina qual será o ajuste de posição da imagem.
    */
    function previewImageChenge(type) {
        let styleCharge = imagePreview;
        let interval = 5;
        if (type === 1) styleCharge.left -= interval;
        else if (type === 2) styleCharge.left += interval;
        else if (type === 3) styleCharge.top -= interval;
        else if (type === 4) styleCharge.top += interval;
        else if (type === 5) styleCharge.width += interval;
        else if (type === 6) styleCharge.width -= interval;
        return styleCharge;
    }

    function clear() {
        setAnnouncement({ ..."", enabled: 0 });
        setInputState({ ...0 });
    }

    const updateImage = event => {

        event.preventDefault();
        setLoading([1, 0, 0, 0]);
        setInputState({ ...0 })
        setAnnouncement({ ..."", enabled: 0 })

        if (event.target[0].value == "") {
            const request = {
                imageSetting: {
                    left: imagePreview.left,
                    top: imagePreview.top,
                    width: imagePreview.width
                }
            };


            updateInfosManager(0, request, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {

                if (!res.data.erro) {
                    setAnnouncement({
                        enabled: 1,
                        type: "info",
                        massage: res.data.mensagem
                    });
                    setInputState({ ...0, image: 1 })
                } else {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            break;
                        case 417:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                        default:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                    }
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

        } else {
            var formInputs = {
                imageSetting: {
                    left: imagePreview.left,
                    top: imagePreview.top,
                    width: imagePreview.width
                }
            };

            const request = new FormData();
            request.append('image', image);
            request.append('formInputs', JSON.stringify(formInputs));

            updateInfosManager(1, request, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {

                if (!res.data.erro) {
                    setAnnouncement({
                        enabled: 1,
                        type: "info",
                        massage: res.data.mensagem
                    });
                    setInputState({ ...0, image: 1 })
                } else {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            break;
                        case 417:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                        case 400:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: res.data.mensagem
                            })
                            setInputState({ ...0, image: 2 })
                            break;
                        default:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                    }
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
        }


    }

    const updateEmail = event => {

        event.preventDefault();
        setLoading([0, 1, 0, 0]);
        setInputState({ ...0 })
        setAnnouncement({ ..."", enabled: 0 })

        if (event.target[0].value != "") {
            const request = {
                email: event.target[0].value
            };


            updateInfosManager(2, request, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {

                if (!res.data.erro) {
                    setAnnouncement({
                        enabled: 1,
                        type: "warning",
                        massage: res.data.mensagem
                    });
                    setInputState({ ...0, email: 1 })
                } else {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            break;
                        case 400:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: res.data.mensagem
                            })
                            setInputState({ ...0, email: 2 })
                            break;
                        default:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                    }
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

        } else {
            setAnnouncement({
                enabled: 1,
                type: "warning",
                massage: "O campo email esta vazio!"
            })
            setInputState({ ...0, email: 2 })
            setLoading(0)
        }


    }

    /**
    * Esta arrow function pega o valor dos Inputs do form e armazena no useState "register", ele tambem implementa mascaras nos inputs telephone e cep.
    * @param {object} event - Informações do evento onChange.
    * @param {string} event.target.value - valor do input.
    * @param {string} event.target.name - nome do input.
    */
    const dadosOnChangeEvent = event => {
        var value = event.target.value;

        function cleanMask(number) {
            number = number.replace(/[A-Z]/gi, '');
            number = number.replace(/[^a-z0-9]/gi, '');
            number = number.replace(/\-/g, '');
            number = number.replace(/ /g, '');
            return number;
        }


        if (event.target.name === "cep") {
            let cep = value;
            cep = cep.replace(/\D/g, "")
            cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
            event.target.value = cep;
            setDados({ ...value });
        } else if (event.target.name === "telephone") {
            let phone = cleanMask(value);
            let ddd, number;

            if (phone.length >= 11) phone = "(" + phone.slice(0, 2) + ") " + phone.slice(2, 7) + "-" + phone.slice(7, 11);
            else if (phone.length >= 3) {

                ddd = phone.slice(0, 2);

                if (phone.length >= 7) {
                    number = phone.slice(2, 6);
                    number += "-" + phone.slice(6, 10);
                } else number = phone.slice(2);

                phone = `(${ddd}) ${number}`;
            }

            event.target.value = phone;
            setDados({ ...value });
        } else {
            setDados({ ...value });
        }

        clear();
    }

    const updateDados = event => {

        event.preventDefault();
        setLoading([0, 0, 1, 0]);
        setInputState({ ...0 })
        setAnnouncement({ ..."", enabled: 0 })

        var valid = true;
        var state = inputState;

        for (let i = 0; i < (event.target.length - 1); i++) {
            if (event.target[i].name != "numero" && event.target[i].name != "complemento") {
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
                    // inputState["name"] = 2;
                    // alert(event.target[i].name)
                    state[event.target[i].name] = 2;
                    valid = false;
                }
            }
        }

        if (valid) {
            const request = {
                name: event.target[0].value,
                address: {
                    rua: event.target[1].value,
                    bairro: event.target[2].value,
                    cidade: event.target[3].value,
                    estado: event.target[4].value,
                    numero: event.target[5].value,
                    complemento: event.target[6].value,
                    cep: event.target[7].value
                },
                telephone: event.target[8].value
            };


            updateInfosManager(3, request, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {

                if (!res.data.erro) {
                    setAnnouncement({
                        enabled: 1,
                        type: "warning",
                        massage: res.data.mensagem
                    });
                    setInputState({
                        ...0,
                        name: 1,
                        telephone: 1,
                        rua: 1,
                        bairro: 1,
                        cidade: 1,
                        estado: 1,
                        numero: 1,
                        complemento: 1,
                        cep: 1
                    });
                } else {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            setInputState({
                                name: 2,
                                telephone: 2,
                                rua: 2,
                                bairro: 2,
                                cidade: 2,
                                estado: 2,
                                numero: 2,
                                complemento: 2,
                                cep: 2
                            });
                            break;
                        case 400:
                            for (let i = 0; i < res.data.erroDetails.length; i++) {
                                setAnnouncement({
                                    enabled: 1,
                                    type: "warning",
                                    massage: res.data.erroDetails[i].mensagem
                                })
                                state[res.data.erroDetails[i].campo] = 2;
                            }
                            setInputState(state)
                            break;
                        default:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                    }
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

        } else setInputState(state);

        setLoading(0);
    }

    const passwordOnChangeEvent = event => {
        clear();
        var value = event.target.value;

        if (event.target.name == "otherPass") {

            if (value.length >= password.newPass.length) {
                if (password.newPass == value) {
                    setInputState({ otherPass: 1 });
                }
                else {
                    setAnnouncement({
                        enabled: 1,
                        type: "danger",
                        massage: "A senha inserida no campo 'Repita a nova Senha' deve ser a mesma do campo 'Atualizar Senha'. "
                    });
                    setInputState({ otherPass: 2 });
                }
            }



            setPassword({ ...password, otherPass: value });
        } else {
            setPassword({ ...password, newPass: value });
        }
    }

    const updateSenha = event => {

        event.preventDefault();
        setLoading([0, 0, 0, 1]);
        setInputState({ ...0 })
        setAnnouncement({ ..."", enabled: 0 })

        var valid = true;
        var state = inputState;

        for (let i = 0; i < (event.target.length - 1); i++) {
            if (event.target[i].name != "numero" && event.target[i].name != "complemento") {
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
                    // inputState["name"] = 2;
                    // alert(event.target[i].name)
                    state[event.target[i].name] = 2;
                    valid = false;
                }
            }
        }


        if (valid && (event.target[0].value == event.target[1].value)) {
            const request = {
                password: event.target[1].value,
            };

            updateInfosManager(4, request, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {

                if (!res.data.erro) {
                    setAnnouncement({
                        enabled: 1,
                        type: "warning",
                        massage: res.data.mensagem
                    });
                    setInputState({
                        ...0,
                        newPass: 1,
                        otherPass: 1,
                    });
                } else {
                    switch (res.data.code) {
                        case 500:
                            setAnnouncement({
                                enabled: 1,
                                type: "danger",
                                massage: String.error500
                            })
                            setInputState({
                                newPass: 2,
                                otherPass: 2,
                            });
                            break;
                        case 400:
                            for (let i = 0; i < res.data.erroDetails.length; i++) {
                                setAnnouncement({
                                    enabled: 1,
                                    type: "warning",
                                    massage: res.data.erroDetails[i].mensagem
                                })
                                state[res.data.erroDetails[i].campo] = 2;
                            }
                            setInputState(state)
                            break;
                        default:
                            tokenManager.deleteToken();
                            redirect[1](1);
                            break;
                    }
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

        } else {
            setAnnouncement({
                enabled: 1,
                type: "danger",
                massage: "A senha inserida no campo 'Repita a nova Senha' deve ser a mesma do campo 'Atualizar Senha'. "
            });
            setInputState({ otherPass: 2 });
        }

        setLoading(0);
    }

    const goToDeleteUserScreen = () => props.switchScreensFromProps(7);

    return (
        <Container>
            {redirect[0] ? <Redirect to='/login' /> : null}

            <br />

            {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
            {announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

            <br />

            <h3>{String.menuEditUser}</h3>

            <ItemDiv />

            <Row md="2" sm="2" xs="1">
                <Col>
                    <ItemColAvatar>
                        {/* Foto de Perfil */}
                        {/* <ItemAvatar src={avatarTMP} /> */}
                        <ProfilePhoto imgUrl={avatarBackground}>

                            {image ?
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Imagem"
                                    style={{
                                        left: imagePreview.left + "px",
                                        top: imagePreview.top + "px",
                                        width: imagePreview.width + "%"
                                    }}
                                />
                                : <img
                                    src={props.userInfos.photo[0]}
                                    alt="Imagem"
                                    style={{
                                        left: imagePreview.left + "px",
                                        top: imagePreview.top + "px",
                                        width: imagePreview.width + "%"
                                    }}
                                />
                            }
                        </ProfilePhoto>
                    </ItemColAvatar>
                </Col>

                <Col>
                    <h5>{String.userAvaterSend}: </h5>
                    {/* Atualizar foto de Perfil */}
                    <Form onSubmit={updateImage}>
                        <FormGroup>
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.image)}
                                type="file"
                                placeholder={String.userAvaterSend}
                                name='image'
                                onChange={e => { clear(); setImage(e.target.files[0]); }}
                            />
                            <br />
                            {/* Deve-se manter esta formatação para que seja obedecido o espaçamento entre os botões */}

                            <LocateButton>
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(1) }) }}> {String.left}</Button>
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(3) }) }}> {String.up}</Button>
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(4) }) }}> {String.down}</Button>
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(2) }) }}> {String.right}</Button>
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(5) }) }}> {String.zoomplus}</Button>
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(6) }) }}> {String.zoomsmall}</Button>
                            </LocateButton>

                        </FormGroup>

                        {loading[0] ?
                            <Button block color="dark" type="submit"><img style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                            :
                            <Button block color="dark" type="submit">{String.save}</Button>
                        }
                    </Form>
                </Col>
            </Row>

            <ItemDiv />

            <Form onSubmit={updateEmail}>
                <h5>{String.email}: </h5>
                <FormGroup>
                    <Input
                        className={(state => {
                            if (state == 0) return ("")
                            else if (state == 1) return ("is-valid")
                            else if (state == 2) return ("is-invalid")
                        })(inputState.email)}
                        id="newEmail"
                        name="email"
                        placeholder={String.userEmailUpdate}
                        type="email"
                        value={email}
                        onChange={e => { clear(); setEmail(e.target.value); }}
                    />
                </FormGroup>

                {loading[1] ?
                    <Button block color="dark" type="submit"><img style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                    :
                    <Button block color="dark" type="submit">{String.save}</Button>
                }

            </Form>

            <ItemDiv />

            <Form onSubmit={updateDados}>
                <FormGroup>
                    {/* Atualizar Nome/Endereço/Numero de Telefone */}
                    <h5>{String.datas}: </h5>
                    <Row md="2" sm="2" xs="1" >

                        <Col size="200px">
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.name)}
                                id="newLogin"
                                name="name"
                                maxLength="150"
                                placeholder={String.userNameUpdate}
                                type="text"
                                value={dados.name}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.rua)}
                                type="text"
                                placeholder={String.endRuaUpdate}
                                name='rua'
                                value={dados.rua}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.bairro)}
                                type="text"
                                placeholder={String.endBairroUpdate}
                                name='bairro'
                                value={dados.bairro}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.cidade)}
                                type="text"
                                placeholder={String.endCidadUpdate}
                                name='cidade'
                                value={dados.cidade}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.estado)}
                                type="text"
                                placeholder={String.endEstadoUpdate}
                                name='estado'
                                value={dados.estado}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                        </Col>
                        <Col>

                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.numero)}
                                type="text"
                                placeholder={String.endNumUpdate}
                                name='numero'
                                value={dados.numero}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.complemento)}
                                type="text"
                                placeholder={String.endCompletUpdate}
                                name='complemento'
                                value={dados.complemento}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.cep)}
                                type="text"
                                maxLength="9"
                                placeholder={String.endCepUpdate}
                                name='cep'
                                value={dados.cep}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            <Input
                                className={(state => {
                                    if (state == 0) return ("")
                                    else if (state == 1) return ("is-valid")
                                    else if (state == 2) return ("is-invalid")
                                })(inputState.telephone)}
                                id="newTell"
                                name="telephone"
                                maxLength="15"
                                placeholder={String.userTellUpdate}
                                type="text"
                                value={dados.telephone}
                                onChange={dadosOnChangeEvent}
                            />
                            <br />
                            {loading[2] ?
                                <Button block color="dark" type="submit"><img style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                                :
                                <Button block color="dark" type="submit">{String.save}</Button>
                            }

                        </Col>


                    </Row >

                </FormGroup>

            </Form>

            <ItemDiv />

            <Row onSubmit={updateSenha}>
                {/* Atualizar senha */}
                <h5>{String.pass}: </h5>
                <Form>
                    <FormGroup>
                        <Input
                            id="newPass"
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.newPass)}
                            type="password"
                            maxLength="60"
                            placeholder={String.userPassUpdate}
                            name='newPass'
                            value={password.newPass}
                            onChange={passwordOnChangeEvent}
                        />
                        <br />
                        <Input
                            id="newPassRepet"
                            className={(state => {
                                if (state == 0) return ("")
                                else if (state == 1) return ("is-valid")
                                else if (state == 2) return ("is-invalid")
                            })(inputState.otherPass)}
                            type="password"
                            maxLength="60"
                            placeholder={String.userPassRepet}
                            name='otherPass'
                            value={password.otherPass}
                            onChange={passwordOnChangeEvent}
                        />
                    </FormGroup>

                    {loading[3] ?
                        <Button block color="dark" type="submit"><img style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                        :
                        <Button block color="dark" type="submit">{String.save}</Button>
                    }

                </Form>
            </Row>

            <ItemDiv />

            <Form>
                <AlertDelet>

                    <h4>{String.userDelteCount}? </h4>
                    <Button
                        block
                        color="danger"
                        onClick={goToDeleteUserScreen}
                    >
                        {String.delete}
                    </Button>
                </AlertDelet>
            </Form>
            <br />

        </Container >

    )
}


export default App;