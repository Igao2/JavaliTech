import React, { useState } from 'react';
import { Container, Header, ProfilePhoto } from '../../style/style';
import './stemporarycss.css';

import registerProfileManager from '../../dispatcher/register';




function App() {

    const [register, setValue] = useState({
        "name": "",
        "email": "",
        "password": "",
        "telephone": ""
    });
    const [image, setImage] = useState('');
    const [imagePreview, setPreview] = useState({
        "left": 0,
        "top": 0,
        "width": 100
    });

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


    const onChangeEvent = event => {
        let value = event.target.value;

        console.log(value)
        console.log(event.target.name)

        function cleanMask(number) {
            number = number.replace(/[A-Z]/gi, '');
            number = number.replace(/[^a-z0-9]/gi, '');
            number = number.replace(/\-/g, '');
            number = number.replace(/ /g, '');
            return number;
        }



        if (event.target.name === "telephone") {
            let phone = cleanMask(value);
            let ddd, number;

            if (phone.length >= 11) phone = phone.slice(0, 2) + " " + phone.slice(2, 7) + "-" + phone.slice(7, 11);
            else if (phone.length >= 3) {

                ddd = phone.slice(0, 2);

                if (phone.length >= 7) {
                    number = phone.slice(2, 6);
                    number += "-" + phone.slice(6, 10);
                } else number = phone.slice(2);

                phone = ddd + " " + number;
            }

            event.target.value = phone;
            setValue({ ...value });
        } else {
            setValue({ ...value });
        }
    }

    const registerProfile = event => {

        event.preventDefault();

        var valid = true;

        const inputNames = {
            "name": "Nome",
            "email": "Email",
            "password": "Senha",
            "telephone": "Telefone",
            "image": "Imagem",
        }

        for (let i = 0; i < (event.target.length - 1); i++) {
            const element = event.target[i].value;
            if (element == "") {
                alert("O campo " + inputNames[event.target[i].name] + " esta vazio")
                valid = false;
            }
        }

        if (valid) {

            let formInputs = {}
            formInputs.name = event.target[0].value;
            formInputs.email = event.target[1].value;
            formInputs.password = event.target[2].value;
            formInputs.telephone = event.target[3].value;
            formInputs.ajuste = {
                "left": imagePreview.left,
                "top": imagePreview.top,
                "width": imagePreview.width
            }

            const request = new FormData();
            request.append('image', image);
            request.append('formInputs', JSON.stringify(formInputs));


            registerProfileManager(request).then(res => {
                console.log("ola")
            });

        }

    }

    // O css da tabela está no arquivo "temporarycss.css", é um css de teste só pra não ficar tão ilegível como estava.
    // Quando o layout legitimo for criado esse css deve ser previsto para evitar problemas futuros.
    return (

        <Container>
            <Header>
                oi meu chapa

            </Header>

            <form onSubmit={registerProfile}>

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