/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff_buttom, BodyOff_top_off, BodyOff, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';
import searchResultManager from '../../dispatcher/searchBarRequest';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Alert, Form, FormGroup } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';
import ViewOS from '../components/painel/view_os';

import './intemporarycss.css';

function App() {

	/** const useState para alertar errors, warnings, informs e etc... */
	const [announcement, setAnnouncement] = useState({
		enabled: 0,
		type: "",
		massage: ""
	})

	/** variave useState para o Input "searchText" */
	var searchBar;
	useState(searchBar);

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

	/** const useState para o resultado de pesquisa OS */
	const [value, setValue] = useState(initValues);

	/**
	* Esta arrow function pega o valor do Input "searchText" e armazena no useState “searchBar” e quando o número de caracteres digitados pelo usuário chega a 6, ele faz uma requisição ao server,  se o código da OS for válido o useState “value” é atualizado com as novas informações.
	* @param {object} event - Informações do evento onChange.
	* @param {string} event.target.value - valor do input.
	* */
	const onChangeEvent = event => {
		let code = event.target.value.toUpperCase();
		event.target.value = code;

		setAnnouncement({ ..."", enabled: 0 })

		if (code.length === 6) {
			searchResultManager(code).then(res => {
				if (res.data === 204) {
					setAnnouncement({
						enabled: 1,
						type: "warning",
						massage: "Não existe nenhuma Ordem de Serviço com o código inserido!"
					})
				}
				else if (res.data === 417) {
					setAnnouncement({
						enabled: 1,
						type: "dark",
						massage: "Esta Ordem de Serviço pode ser acessada no momento. Por favor, tente novamente mais tarde."
					})
				}
				else if (res.data === 500) {
					setAnnouncement({
						enabled: 1,
						type: "danger",
						massage: String.error500
					})
				}
				else setValue(res.data)
			}).catch(error => {
				setAnnouncement({
					enabled: 1,
					type: "danger",
					massage: String.error500
				})
			});;

		} else setValue(initValues);

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
						{announcement.enabled ? <Alert color={announcement.type} dismissible>{announcement.massage}</Alert> : null}

						<h2>{String.search_OS}</h2>

					</BodyOff_top_off>

					<BodyOff_buttom>

						<Form>
							<FormGroup row>
								<Input
									id="cod_OS"
									type="text"
									maxLength="6"
									placeholder={String.cod_OS}
									name='searchText'
									value={searchBar}
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
						/>

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
