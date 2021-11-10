/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';
import searchResultManager from '../../dispatcher/searchBarRequest';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Alert, Form, FormGroup } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';

import './intemporarycss.css';

function App() {
	var searchBar;
	useState(searchBar);
	const [value, setValue] = useState({
		"service_order_id": "",
		"owner_name": "",
		"description": "",
		"device_photos": "",
		"delivery_date": "",
		"completion_date": "",
		"status": "",
		"service_value": "",
		"user_name": "",
		"user_photo": ""
	});

	const onChangeEvent = event => {
		let code = event.target.value.toUpperCase();
		event.target.value = code;

		if (code.length === 6) {
			searchResultManager(code).then(res => {
				if (res.data === 204) alert("OS não existe")
				else if (res.data === 417) alert("OS corronpida")
				else if (res.data === 500) alert("Erro de sistema")
				else setValue(res.data)
			});
		} else
			setValue({ ...null, "user_photo": ["", ""] });

	}

	// O css da tabela está no arquivo "temporarycss.css", é um css de teste só pra não ficar tão ilegível como estava.
	// Quando o layout legitimo for criado esse css deve ser previsto para evitar problemas futuros.
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
						<h2>{String.search_OS}</h2>

					</BodyOff_top_off>
					<BodyOff_buttom>

						<Form>
							<FormGroup row>
								<Input
									valid
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
						<div>
							<table>
								<tbody>
									<tr>
										<th>service_order_id</th>
										<th>owner_name</th>
										<th>description</th>
										<th>device_photos</th>
										<th>delivery_date</th>
										<th>completion_date</th>
										<th>status</th>
										<th>service_value</th>
										<th>user_name</th>
										<th>user_photo</th>
									</tr>

									<tr>
										<th>{value.service_order_id}</th>
										<th>{value.owner_name}</th>
										<th>{value.description}</th>
										<th>{value.device_photos}</th>
										<th>{value.delivery_date}</th>
										<th>{value.completion_date}</th>
										<th>{value.status}</th>
										<th>{value.service_value}</th>
										<th>{value.user_name}</th>
										<th>
											<img width="50" src={value.user_photo[0]} />
										</th>
									</tr>
								</tbody>
							</table>
						</div>

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
