/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';

import loginManager from '../../dispatcher/login';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Alert, Form, FormGroup } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';


function App() {

	const [login, setLogin] = useState({
		"email": "",
		"password": ""
	})

	const onChangeEvent = event => {
		var value = event.target.value;

		setLogin({ ...value });
	}

	const loginOnSubmit = event => {

		event.preventDefault();

		var valid = true;

		const inputNames = {
			"email": "Email",
			"password": "Senha"
		}

		for (let i = 0; i < (event.target.length - 1); i++) {
			if (event.target[i].value == "") {
				alert("O campo " + inputNames[event.target[i].name] + " esta vazio")
				valid = false;
			}
		}

		if (valid) {

			let formInputs = {
				"email": event.target[0].value,
				"password": event.target[1].value
			}

			loginManager(formInputs).then(res => {
				console.log(res.data)
				console.log(res.data.token)

				if (res.data.code === 200) alert(res.data.token)
				else alert("não foi")
			});
		}
	}

	return (
		<div>
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

					<BodyOff_top_off>

						{/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
						<Alert color="warning" dismissible>{String.alete00}</Alert>
						<h2>{String.login_init}</h2>

					</BodyOff_top_off>
					<BodyOff_buttom>

						{/* invalid: vermelho | valid: verde */}

						<Form onSubmit={loginOnSubmit}>
							<FormGroup row>
								<Input
									valid
									required
									id="login_at"
									name="email"
									placeholder="Login"
									type="email"
									value={login.email}
									onChange={onChangeEvent}
								/>
							</FormGroup>
							<FormGroup row>
								<Input
									invalid
									id="pass_at"
									name="password"
									placeholder="Senha"
									type="password"
									value={login.password}
									onChange={onChangeEvent}
								/>
							</FormGroup>
							<FormGroup row >
								<Button>
									Entrar
								</Button>
							</FormGroup>
						</Form>

					</BodyOff_buttom>

				</BodyOff>
				<FooterOff>

					<Footer_off />

				</FooterOff>
			</ContainerOff>
		</div >
	);
}

export default App;
