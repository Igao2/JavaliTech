/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import {
    BodyOff, ContainerOff, FooterOff, HeaderOff,
    AlertDelet, ItemColAvatar, ItemDiv, ProfilePhoto, QuadrosOS, LocateButton
} from '../../assets/values/styles';


import HeaderContainerOff from '../components/headers/header_off';
import registerProfileManager from '../../dispatcher/register';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';
import avatarBackground from '../../assets/images/icons/backgroundAvatar.png';
import avatarTemp from '../../assets/images/icons/avatarTemp.png';
import { Redirect } from "react-router-dom";

function App() {

    /** const useState para alertar errors, warnings, informs e etc... */
    const [announcement, setAnnouncement] = useState({
        enabled: 0,
        type: "",
        massage: ""
    })

    /** const useState para os Inputs do formulario de cadatro  */
    const [register, setValue] = useState({
        name: "",
        email: "",
        password: "",
        telephone: "",
        cep: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
    });

    /** const useState para definir os status dos campos. */
    const [inputState,] = useState({
        name: 0,
        email: 0,
        password: 0,
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
        "left": 0,
        "top": 0,
        "width": 100
    });

    /** const useState ativar e desativar a gif de loading do botão de cadastrar-se. */
    const [loading, setLoading] = useState(0);

    /** const useState para o redirecionamento de tela. */
    const redirect = useState(0);

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

    /**
    * Esta arrow function pega o valor dos Inputs do form e armazena no useState "register", ele tambem implementa mascaras nos inputs telephone e cep.
    * @param {object} event - Informações do evento onChange.
    * @param {string} event.target.value - valor do input.
    * @param {string} event.target.name - nome do input.
    */
    const onChangeEvent = event => {
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
            setValue({ ...value });
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
            setValue({ ...value });
        } else {
            setValue({ ...value });
        }

        setAnnouncement({ ..."", enabled: 0 })
    }

    /**
    * Esta arrow function é o evento de submit do form, ela pega os valores dos Inputs do form, verifica se os campos foram preenchidos, se sim ele manda os dados para API para que o cadastro seja realizado
    * @param {object} event - Informações do evento onChange.
    * @param {object[]} event.target - Array com as informações de cada input.
    * @param {string} event.target[].value - valor do input.
    * @param {string} event.target[].name - nome do input.
    */
    const registerProfile = event => {

        event.preventDefault();
        setLoading(1);

        var valid = true;

        const inputNames = {
            "name": "\"Nome\"",
            "email": "\"Email\"",
            "password": "\"Senha\"",
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

        for (let i = 0; i < (event.target.length - 1); i++) {
            if (event.target[i].name !== "numero" && event.target[i].name !== "complemento") {
                if (event.target[i].value === "") {
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
                    inputState[event.target[i].name] = 2;
                    valid = false;
                }
            }
            if (i === 0) i = 6;
        }

        if (valid) {

            let formInputs = {
                name: event.target[7].value,
                telephone: event.target[8].value,
                email: event.target[9].value,
                password: event.target[10].value,
                address: {
                    rua: event.target[11].value,
                    bairro: event.target[12].value,
                    cidade: event.target[13].value,
                    estado: event.target[14].value,
                    numero: event.target[15].value,
                    complemento: event.target[16].value,
                    cep: event.target[17].value,
                },
                imageSetting: {
                    left: imagePreview.left,
                    top: imagePreview.top,
                    width: imagePreview.width
                }

            }


            const request = new FormData();
            request.append('image', image);
            request.append('formInputs', JSON.stringify(formInputs));


            /** Faz a requisição para a API com os dados do novo usuarido, para que ele possa ser cadastrado.
            * @param {object} request - Dados do novo usuarido.
            * @param {object} res - Resposta da API.
            */
            registerProfileManager(request).then(res => {

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
                                massage: String.error500
                            })
                    }
                } else {
                    redirect[1](1);
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

    }

    return (
        <div>
            {redirect[0] ? <Redirect to='/login' /> : null}
            <Helmet>
                <title>{String.nomeApp_sistema}</title>
                <meta name="title" content={String.nomeApp_sistema} />
                <meta property="og:title" content={String.nomeApp_sistema} />
                <meta property="og:site_name" content={String.nomeApp_sistema} />
                <meta property="og:description" content={String.nomeApp_descricao} />
            </Helmet>

            <ContainerOff>
                <HeaderOff>

                    <HeaderContainerOff />

                </HeaderOff>
                <BodyOff>

                    <QuadrosOS>
                        {/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
                        {announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

                        <Form onSubmit={registerProfile}>
                            <FormGroup>
                                <h3>{String.registrerUser}</h3>
                                <QuadrosOS>
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
                                                            src={avatarTemp}
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
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.image)}
                                                type="file"
                                                placeholder={String.userAvaterSend}
                                                name='image'
                                                value={register.image}
                                                onChange={e => setImage(e.target.files[0])}
                                            />
                                            <ItemDiv />
                                            <LocateButton>
                                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(1) }) }}>{String.left}</Button>
                                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(3) }) }}>{String.up}</Button>
                                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(4) }) }}>{String.down}</Button>
                                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(2) }) }}>{String.right}</Button>
                                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(5) }) }}>{String.zoomplus}</Button>
                                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(6) }) }}>{String.zoomsmall}</Button>
                                            </LocateButton>
                                        </Col>
                                    </Row>
                                </QuadrosOS>
                                <QuadrosOS>

                                    <h6>{String.osInfoBasic}: </h6>

                                    <Row md="2" sm="2" xs="1">
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.name)}
                                                type="text"
                                                maxLength="150"
                                                placeholder={String.userNameNew}
                                                name="name"
                                                value={register.name}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.telephone)}
                                                type="text"
                                                maxLength="15"
                                                placeholder={String.userTellNew}
                                                name='telephone'
                                                value={register.telephone}
                                                onChange={onChangeEvent}
                                            // data-mask="(00) 0000-0000"
                                            // data-mask-selectonfocus="true"
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Input
                                        className={(state => {
                                            if (state === 0) return ("")
                                            else if (state === 1) return ("is-valid")
                                            else if (state === 2) return ("is-invalid")
                                        })(inputState.email)}
                                        type="email"
                                        placeholder={String.userEmailNew}
                                        name='email'
                                        value={register.email}
                                        onChange={onChangeEvent}
                                    />
                                    <br />
                                    <Input
                                        className={(state => {
                                            if (state === 0) return ("")
                                            else if (state === 1) return ("is-valid")
                                            else if (state === 2) return ("is-invalid")
                                        })(inputState.password)}
                                        type="password"
                                        maxLength="60"
                                        placeholder={String.userPassNew}
                                        name='password'
                                        value={register.password}
                                        onChange={onChangeEvent}
                                    />
                                    <br />
                                    <h6>{String.itemInfo02}</h6>
                                    <Row md="3" sm="3" xs="1">
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.rua)}
                                                type="text"
                                                placeholder={String.endRua}
                                                name='rua'
                                                value={register.rua}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.bairro)}
                                                type="text"
                                                placeholder={String.endBairro}
                                                name='bairro'
                                                value={register.bairro}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.cidade)}
                                                type="text"
                                                placeholder={String.endCidad}
                                                name='cidade'
                                                value={register.cidade}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.estado)}
                                                type="text"
                                                placeholder={String.endEstado}
                                                name='estado'
                                                value={register.estado}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                    </Row>
                                    <Row md="2" sm="2" xs="1">
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.numero)}
                                                type="text"
                                                placeholder={String.endNum}
                                                name='numero'
                                                value={register.numero}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                        <Col>
                                            <br />
                                            <Input
                                                className={(state => {
                                                    if (state === 0) return ("")
                                                    else if (state === 1) return ("is-valid")
                                                    else if (state === 2) return ("is-invalid")
                                                })(inputState.complemento)}
                                                type="text"
                                                placeholder={String.endComplet}
                                                name='complemento'
                                                value={register.complemento}
                                                onChange={onChangeEvent}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Input
                                        className={(state => {
                                            if (state === 0) return ("")
                                            else if (state === 1) return ("is-valid")
                                            else if (state === 2) return ("is-invalid")
                                        })(inputState.cep)}
                                        type="text"
                                        maxLength="9"
                                        placeholder={String.endCep}
                                        name='cep'
                                        value={register.cep}
                                        onChange={onChangeEvent}
                                    />
                                </QuadrosOS>

                                <AlertDelet>
                                    {loading ?
                                        <Button block color="dark" type="submit"><img alt="loading.gif" style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
                                        :
                                        <Button block color="dark" type="submit">{String.registrerUserButtom}</Button>
                                    }
                                </AlertDelet>
                                <br />
                            </FormGroup>
                        </Form>

                    </QuadrosOS >

                </BodyOff>
                <FooterOff>

                    <Footer_off />

                </FooterOff>
            </ContainerOff>
        </div >
    );
}

export default App;