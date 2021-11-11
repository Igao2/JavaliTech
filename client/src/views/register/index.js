import React, { useState } from 'react';
import { Container, Header, ProfilePhoto } from '../../style/style';
import './stemporarycss.css';

import registerProfileManager from '../../dispatcher/register';




function App() {

    /** const useState para os Inputs do formulari de cadatro  */
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
        "width": 100
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

        <Container>
            <Header>
                oi meu chapa

            </Header>

            <form onSubmit={registerProfile}>
                <div className="primariIputs">
                    <label>Nome
                        <input
                            type="text"
                            maxLength="150"
                            placeholder="Nome"
                            name='nome'
                            value={register.name}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>
                    <br />

                    <label>Email
                        <input
                            type="email"
                            placeholder="Email"
                            name='email'
                            value={register.email}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>
                    <br />

                    <label>Senha
                        <input
                            type="password"
                            maxLength="60"
                            placeholder="Senha"
                            name='password'
                            value={register.password}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>
                    <br />

                    <label>Telefone
                        <input
                            type="text"
                            maxLength="15"
                            placeholder="Telefone"
                            name='telephone'
                            value={register.telephone}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className="emdereco">
                    <p>Emdereço</p>

                    <label>
                        Cep
                        <input
                            type="text"
                            maxLength="9"
                            placeholder="cep"
                            name='cep'
                            value={register.cep}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>

                    <label>
                        Estado
                        <input
                            type="text"
                            placeholder="estado"
                            name='estado'
                            value={register.estado}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>


                    <label>
                        Cidade
                        <input
                            type="text"
                            placeholder="cidade"
                            name='cidade'
                            value={register.cidade}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>

                    <label>
                        Bairro
                        <input
                            type="text"
                            placeholder="bairro"
                            name='bairro'
                            value={register.bairro}
                            onChange={onChangeEvent}
                            required
                        />
                    </label>

                    <label>
                        Complemento
                        <input
                            type="text"
                            placeholder="complemento"
                            name='complemento'
                            value={register.complemento}
                            onChange={onChangeEvent}
                        />
                    </label>

                    <label>
                        Numero
                        <input
                            type="number"
                            placeholder="numero na casa"
                            name='numero'
                            value={register.numero}
                            onChange={onChangeEvent}
                        />
                    </label>


                </div>
                <br />

                <label>
                    Foto
                    <input
                        type="file"
                        placeholder="Foto"
                        name='image'
                        value={register.image}
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </label>
                <br />




                <div>

                    <ProfilePhoto>
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
                                src='./favicon.ico'
                                alt="Imagem"
                                style={{
                                    left: imagePreview.left + "px",
                                    top: imagePreview.top + "px",
                                    width: imagePreview.width + "px"
                                }}
                            />
                        }

                    </ProfilePhoto>


                    <a className="button" onClick={() => { setPreview({ ...previewImageChenge(1) }) }}>Esquerda</a>
                    <a className="button" onClick={() => { setPreview({ ...previewImageChenge(2) }) }}>Direita</a>
                    <a className="button" onClick={() => { setPreview({ ...previewImageChenge(3) }) }}>Cima</a>
                    <br />
                    <a className="button" onClick={() => { setPreview({ ...previewImageChenge(4) }) }}>Baixo</a>
                    <a className="button" onClick={() => { setPreview({ ...previewImageChenge(5) }) }}>Aumentar</a>
                    <a className="button" onClick={() => { setPreview({ ...previewImageChenge(6) }) }}>Diminuir</a>
                </div>
                <br />


                <button className="button right" type="submit">Salvar</button>

            </form>



        </Container>



    );
}

export default App;