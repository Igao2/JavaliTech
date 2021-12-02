/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';

import loginManager from '../../dispatcher/login';
import { Redirect, NavLink } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Alert, Form, FormGroup } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';

const tokenManager = require('../../dispatcher/tokenManager');


function App() {

	/** const useState para alertar errors, warnings, informs e etc... */
	const [announcement, setAnnouncement] = useState({
		enabled: 0,
		type: "",
		massage: ""
	})

	/** const useState para o valor e status dos campos email e senha. */
	const [login, setLogin] = useState({
		email: "",
		emailState: 0,
		password: "",
		passwordState: 0
	})

	/** const useState ativar e desativar a gif de loading do botão de entrar. */
	const [loading, setLoading] = useState(0);

	/** const useState para o redirecionamento de tela. */
	const redirect = useState(0);

	/**
	* Esta arrow function pega os valores dos Inputs e armazena no useState “login”.
	* @param {object} event - Informações do evento onChange.
	* @param {string} event.target.value - valor do input.
	* */
	const onChangeEvent = event => {
		var value = event.target.value;

		setAnnouncement({ ..."", enabled: 0 })

		setLogin({ ...value, emailState: 0, passwordState: 0 });
	}

	/**
	* Esta arrow function é o evento de submit do form, ela pega os valores dos Inputs do form, verifica se os campos foram preenchidos, se sim ele manda os dados para API para que o login seja realizado
	* @param {object} event - Informações do evento onChange.
	* @param {object[]} event.target - Array com as informações de cada input.
	* @param {string} event.target[].value - valor do input.
	* @param {string} event.target[].name - nome do input.
	*/
	const loginOnSubmit = event => {

		event.preventDefault();
		setLoading(1)

		var valid = true;

		const inputNames = {
			"email": ["Email", "emailState"],
			"password": ["Senha", "passwordState"]
		}

		for (let i = 0; i < (event.target.length - 2); i++) {
			if (event.target[i].value === "") {
				if (!valid)
					setAnnouncement({
						enabled: 1,
						type: "info",
						massage: "Os campos Email e Senha estão vazios"
					})
				else
					setAnnouncement({
						enabled: 1,
						type: "info",
						massage: "O campo " + inputNames[event.target[i].name][0] + " esta vazio"
					})

				login[inputNames[event.target[i].name][1]] = 2;
				valid = false;
			}
		}

		if (valid) {

			let formInputs = {
				"email": event.target[0].value,
				"password": event.target[1].value
			}

			loginManager(formInputs).then(res => {

				if (res.data.erro) {
					switch (res.data.code) {
						case 500:
							setAnnouncement({
								enabled: 1,
								type: "danger",
								massage: res.data.mensagem
							})
							break;
						case 400:
							for (let i = 0; i < res.data.erroDetails.length; i++) {
								setAnnouncement({
									enabled: 1,
									type: "warning",
									massage: res.data.erroDetails[i].mensagem
								})
								login[res.data.erroDetails[i].campo] = 2;
							}
							break;
						case 401:
							setAnnouncement({
								enabled: 1,
								type: "danger",
								massage: "O email ou a senha inserido esta incorreto."
							})
							setLogin({ ...login, emailState: 2, passwordState: 2 });
							break;
						default:
							setAnnouncement({
								enabled: 1,
								type: "danger",
								massage: String.error500
							})
					}

				} else {
					tokenManager.createToken(res.data.token);
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
			});;
		} else setLoading(0)
	}

	return (

		<div>
			{redirect[0] ? <Redirect to='/painel' /> : null}
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
						{announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

						<h2>{String.login_init}</h2>

					</BodyOff_top_off>
					<BodyOff_buttom>

						{/* invalid: vermelho | valid: verde */}

						<Form onSubmit={loginOnSubmit}>
							<FormGroup row>
								<Input
									className={(state => {
										if (state === 0) return ("")
										else if (state === 1) return ("is-valid")
										else if (state === 2) return ("is-invalid")
									})(login.emailState)}

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
									className={(state => {
										if (state === 0) return ("")
										else if (state === 1) return ("is-valid")
										else if (state === 2) return ("is-invalid")
									})(login.passwordState)}

									id="pass_at"
									name="password"
									placeholder="Senha"
									type="password"
									value={login.password}
									onChange={onChangeEvent}
								/>
							</FormGroup>
							<FormGroup row >
								<div>
									{loading ?
										<Button><img alt="loading.gif" style={{ height: "100%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
										:
										<Button>Entrar</Button>
									}
								</div>

								<NavLink to="/register">
									<Button block color="danger">{String.registrerUserButtom}</Button>
								</NavLink>

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
