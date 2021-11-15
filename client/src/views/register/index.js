/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import String from '../../assets/values/string.json';

import { AlertDelet, ItemAvatar, ItemColAvatar, ItemDiv, ProfilePhoto, QuadrosOS } from '../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import registerProfileManager from '../../dispatcher/register';

import { Col, Row, Container, Form, FormGroup, Input, Button } from 'reactstrap';
import avatarBackground from '../../assets/images/icons/backgroundAvatar.png';
import avatarTemp from '../../assets/images/icons/avatarTemp.png'

function Index() {

    /** const useState para os Inputs do formulario de cadatro  */
    const [register, setValue] = useState({
        "name": "",
        "email": "",
        "password": "",
        "telephone": "",
        "cep": "",
        "numero": "",
        "complemento": "",
        "bairro": "",
        "cidade": "",
        "estado": ""
    });

    /** const useState para o Input "image" */
    const [image, setImage] = useState('');

    /** const useState para os imageSettings da imagem */
    const [imagePreview, setPreview] = useState({
        "left": 0,
        "top": 0,
        "width": 150
    });

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

        console.log({
            "left": imagePreview.left,
            "top": imagePreview.top,
            "width": imagePreview.width
        })
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

            if (phone.length >= 11) phone = phone.slice(0, 2) + " " + phone.slice(2, 7) + "-" + phone.slice(7, 11);
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

        var valid = true;

        const inputNames = {
            "name": "Nome",
            "email": "Email",
            "password": "Senha",
            "telephone": "Telefone",
            "image": "Imagem",
            "cep": "Cep",
            "numero": "Numero",
            "complemento": "Complemento",
            "bairro": "Bairro",
            "cidade": "Cidade",
            "estado": "Estado"
        }

        for (let i = 0; i < (event.target.length - 1); i++) {
            const element = event.target[i].value;
            if (element == "") {
                alert("O campo " + inputNames[event.target[i].name] + " esta vazio")
                valid = false;
            }
        }

        if (valid) {

            let formInputs = {
                "name": event.target[0].value,
                "email": event.target[1].value,
                "password": event.target[2].value,
                "telephone": event.target[3].value,
                "address": {
                    "cep": event.target[4].value,
                    "bairro": event.target[7].value,
                    "cidade": event.target[8].value,
                    "estado": event.target[9].value,
                    "numero": event.target[5].value,
                    "complemento": event.target[6].value
                },
                "imageSetting": {
                    "left": imagePreview.left,
                    "top": imagePreview.top,
                    "width": imagePreview.width
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

                    if (res.data.code === 400)
                        for (let i = 0; i < res.data.erroDetails.length; i++) alert(res.data.erroDetails[i].mensagem);

                    else if (res.data === 500) alert(res.data.mensagem);

                } else alert(res.data.mensagem);
            });

        }

    }

    // O css da tabela está no arquivo "stemporarycss.css", é um css de teste só pra não ficar tão ilegível como estava.
    // Quando o layout legitimo for criado esse css deve ser previsto para evitar problemas futuros.

    return (
        <QuadrosOS>
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
                                                width: imagePreview.width + "px"
                                            }}
                                        />
                                        : <img
                                            src={avatarTemp}
                                            alt="Imagem"
                                            style={{
                                                left: imagePreview.left + "px",
                                                top: imagePreview.top + "px",
                                                width: imagePreview.width + "px"
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
                                    type="file"
                                    placeholder={String.userAvaterSend}
                                    name='image'
                                    value={register.image}
                                    onChange={e => setImage(e.target.files[0])}
                                    required
                                />
                                <ItemDiv />
                                {/* Deve-se manter esta formatação para que seja obedecido o espaçamento entre os botões */}
                                <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(1) }) }}> {String.left}
                                </Button> <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(3) }) }}> {String.up}
                                </Button>  <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(4) }) }}> {String.down}
                                </Button> <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(2) }) }}> {String.right}
                                </Button> <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(5) }) }}> {String.zoomplus}
                                </Button> <Button color="dark" onClick={() => { setPreview({ ...previewImageChenge(6) }) }}> {String.zoomsmall}
                                </Button>
                            </Col>
                        </Row>
                    </QuadrosOS>
                    <QuadrosOS>
                        <h6>{String.osInfoBasic}: </h6>

                        <Row md="2" sm="2" xs="1">
                            <Col>
                                <br />
                                <Input
                                    type="text"
                                    maxLength="150"
                                    placeholder={String.userNameNew}
                                    name="nome"
                                    value={register.name}
                                    onChange={onChangeEvent}
                                    required
                                />
                            </Col>
                            <Col>
                                <br />
                                <Input
                                    type="text"
                                    maxLength="15"
                                    placeholder={String.userTellNew}
                                    name='telephone'
                                    value={register.telephone}
                                    onChange={onChangeEvent}
                                    required
                                // data-mask="(00) 0000-0000"
                                // data-mask-selectonfocus="true"
                                />
                            </Col>
                        </Row>
                        <br />
                        <Input
                            type="email"
                            placeholder={String.userEmailNew}
                            name='email'
                            value={register.email}
                            onChange={onChangeEvent}
                            required
                        />
                        <br />
                        <Input
                            type="password"
                            maxLength="60"
                            placeholder={String.userPassNew}
                            name='password'
                            value={register.password}
                            onChange={onChangeEvent}
                            required
                        />
                        <br />
                        <h6>{String.itemInfo02}</h6>
                        <Row md="3" sm="3" xs="1">
                            {/* <Col>
                                <br />
                                <Input
                                    invalid
                                    // name="endRua"
                                    placeholder={String.endRua}
                                // type="text"
                                />
                            </Col> */}
                            <Col>
                                <br />
                                <Input
                                    type="text"
                                    placeholder={String.endBairro}
                                    name='bairro'
                                    value={register.bairro}
                                    onChange={onChangeEvent}
                                    required
                                />
                            </Col>
                            <Col>
                                <br />
                                <Input
                                    type="text"
                                    placeholder={String.endCidad}
                                    name='cidade'
                                    value={register.cidade}
                                    onChange={onChangeEvent}
                                    required
                                />
                            </Col>
                            <Col>
                                <br />
                                <Input
                                    type="text"
                                    placeholder={String.endEstado}
                                    name='estado'
                                    value={register.estado}
                                    onChange={onChangeEvent}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row md="2" sm="2" xs="1">
                            <Col>
                                <br />
                                <Input
                                    type="number"
                                    placeholder={String.endNum}
                                    name='numero'
                                    value={register.numero}
                                    onChange={onChangeEvent}
                                />
                            </Col>
                            <Col>
                                <br />
                                <Input
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
                            type="text"
                            maxLength="9"
                            placeholder={String.endCep}
                            name='cep'
                            value={register.cep}
                            onChange={onChangeEvent}
                            required
                        />
                    </QuadrosOS>

                    <AlertDelet>

                        <h4>{String.userAddCOunt}? </h4>
                        <Button
                            block
                            color="dark"
                            type="submit"
                        >
                            {String.registrerUser}
                        </Button>
                    </AlertDelet>
                    <br />
                </FormGroup>
            </Form>

        </QuadrosOS >

    )
}

export default Index;