/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff_buttom, BodyOff_top_off, BodyOff, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import searchResultManager from '../../dispatcher/searchBarRequest';
import osValidateManager from '../../dispatcher/osValidateRequest';


import { Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Alert, Form, FormGroup } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';
import ViewOS from '../components/painel/view_os';
import ViewOSClear from '../components/painel/view_os_clear';

function App() {

	/** const useState para alertar errors, warnings, informs e etc... */
	const [announcement, setAnnouncement] = useState({
		enabled: 0,
		type: "",
		massage: ""
	})

	const [validaPassword, setValidaPassword] = useState(0)

	/** const useState para o redirecionamento de tela. */
	const redirect = useState(0);

	/** const para inicializar os valores do campo de resultado de pesquisa OS */
	const initValues = {
		"service_order_id": "",
		"owner_name": "",
		"description": "",
		"delivery_date": "0000-00-00T00:00:00.000Z",
		"completion_date": "0000-00-00T00:00:00.000Z",
		"status": "",
		"service_value": "",
		"user_name": "",
		"user_photo": [(String.urlApi + "/userImages/standard_photo.png"), {
			left: "0",
			top: "0",
			width: "100"
		}]
	};

	const [inputState, setInputState] = useState({
		osPass: 0,
		searchText: 0
	})


	/** const useState para o resultado de pesquisa OS */
	const [value, setValue] = useState(initValues);

	const [osPass, setOsPass] = useState();
	const [searchText, setSearchText] = useState();

	/** const useState ativar e desativar a gif de loading do botão de cadastrar-se. */
	const [loading, setLoading] = useState(0);

	/**
	* Esta arrow function pega o valor do Input "searchText" e armazena no useState “searchBar” e quando o número de caracteres digitados pelo usuário chega a 6, ele faz uma requisição ao server,  se o código da OS for válido o useState “value” é atualizado com as novas informações.
	* @param {object} event - Informações do evento onChange.
	* @param {string} event.target.value - valor do input.
	* */
	const onChangeEvent = event => {
		let code = event.target.value.toUpperCase();
		setSearchText(code);

		setAnnouncement({ ..."", enabled: 0 })
		setInputState({
			osPass: 0,
			searchText: 0
		})

		if (code.length === 6) {
			searchResultManager(code).then(res => {
				if (res.data === 204) {
					setAnnouncement({
						enabled: 1,
						type: "warning",
						massage: "Não existe nenhuma Ordem de Serviço com o código inserido!"
					})
					setInputState({
						osPass: 0,
						searchText: 2
					})
				}
				else if (res.data === 417) {
					setAnnouncement({
						enabled: 1,
						type: "dark",
						massage: "Esta Ordem de Serviço pode ser acessada no momento. Por favor, tente novamente mais tarde."
					})
					setInputState({
						osPass: 0,
						searchText: 2
					})
				}
				else if (res.data === 500) {
					setAnnouncement({
						enabled: 1,
						type: "danger",
						massage: String.error500
					})
					setInputState({
						osPass: 0,
						searchText: 2
					})
				}
				else {
					setValue(res.data)
					setInputState({
						osPass: 0,
						searchText: 1
					})
				}
			}).catch(error => {
				setAnnouncement({
					enabled: 1,
					type: "danger",
					massage: String.error500
				})
				setInputState({
					osPass: 0,
					searchText: 2
				})
			});;

		} else setValue(initValues);

	}

	const onChangeEventForPass = event => {
		let code = event.target.value.toLowerCase();
		setOsPass(code);

		setAnnouncement({ ..."", enabled: 0 })
	}

	const enableValidaPassword = () => setValidaPassword(1);

	const disableValidaPassword = () => setValidaPassword(0);

	const viewOs = event => {
		event.preventDefault();
		var osPass = event.target[0].value;
		setLoading(1);

		if (osPass.length === 6) {
			osValidateManager(searchText, osPass).then(res => {
				if (res.data === 200) {
					redirect[1](1)
				} else if (res.data === 401) {
					setAnnouncement({
						enabled: 1,
						type: "warning",
						massage: String.OS_error_senha
					})
					setInputState({
						osPass: 2,
						searchText: 0
					})
					setLoading(0);
				}
				else {
					setAnnouncement({
						enabled: 1,
						type: "danger",
						massage: String.error500
					})
					setInputState({
						osPass: 2,
						searchText: 0
					})
					setLoading(0);
				}
			}).catch(error => {
				setAnnouncement({
					enabled: 1,
					type: "danger",
					massage: String.error500
				})
				setInputState({
					osPass: 2,
					searchText: 0
				})
				setLoading(0);
			});;

		} else {
			setAnnouncement({
				enabled: 1,
				type: "warning",
				massage: String.OS_error_senha
			})
			setInputState({
				osPass: 2,
				searchText: 0
			})
			setLoading(0);
		}

	};

	return (
		<div>
			{redirect[0] ? <Redirect to={'/viewOs/' + searchText + "/" + osPass} /> : null}
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
				{validaPassword ?
					<BodyOff>

						<BodyOff_top_off>

							{/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
							{announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

							<h2>{String.search_OS}</h2>

						</BodyOff_top_off>

						<BodyOff_buttom>

							<Form onSubmit={viewOs}>
								<FormGroup row>
									<Input
										className={(state => {
											if (state === 0) return ("")
											else if (state === 1) return ("is-valid")
											else if (state === 2) return ("is-invalid")
										})(inputState.osPass)}
										type="text"
										maxLength="6"
										placeholder={String.pass_OS}
										name='osPass'
										value={osPass}
										onChange={onChangeEventForPass}
									/>

									{loading ?
										<Button type="submit"><img alt="loading.gif" style={{ width: "3%" }} src="https://i.imgur.com/TRbq1bq.gif" /></Button>
										:
										<Button type="submit">{String.service_view}</Button>
									}

									<Button onClick={e => disableValidaPassword()}>
										{String.cancel}
									</Button>
								</FormGroup>
							</Form>
							<ViewOSClear
								service_order_id={value.service_order_id}
								owner_name={value.owner_name}
								description={value.description}
								delivery_date={value.delivery_date}
								completion_date={value.completion_date}
								status={value.status}
								service_value={value.service_value}
								user_name={value.user_name}
								user_photo={value.user_photo}
							/>

						</BodyOff_buttom>

					</BodyOff>
					:
					<BodyOff>

						<BodyOff_top_off>

							{/* danger: vermelho | warning: amarelo | info: azul | dark: cinza*/}
							{announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

							<h2>{String.search_OS}</h2>

						</BodyOff_top_off>

						<BodyOff_buttom>

							<Form>
								<FormGroup row>
									<Input
										className={(state => {
											if (state === 0) return ("")
											else if (state === 1) return ("is-valid")
											else if (state === 2) return ("is-invalid")
										})(inputState.searchText)}
										type="text"
										maxLength="6"
										placeholder={String.cod_OS}
										name='searchText'
										value={searchText}
										onChange={onChangeEvent}
									/>
								</FormGroup>
							</Form>
							<ViewOS
								service_order_id={value.service_order_id}
								owner_name={value.owner_name}
								description={value.description}
								delivery_date={value.delivery_date}
								completion_date={value.completion_date}
								status={value.status}
								service_value={value.service_value}
								user_name={value.user_name}
								user_photo={value.user_photo}
								enableValidaPassword={enableValidaPassword}
							/>

						</BodyOff_buttom>

					</BodyOff>
				}
				<FooterOff>

					<Footer_off />

				</FooterOff>
			</ContainerOff>
		</div >
	);
}

export default App;
