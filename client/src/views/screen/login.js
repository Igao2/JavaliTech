/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Alert, Form, FormGroup } from 'reactstrap';
import Footer_off from '../components/footers/footers_off';


function App() {

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

						<Form>
							<FormGroup row>
								<Input
									// valid
									id="login_at"
									name="email"
									placeholder="Login"
									type="email"
								/>
							</FormGroup>
							<FormGroup row>
								<Input
									// invalid
									id="pass_at"
									name="password"
									placeholder="Senha"
									type="password"
								/>
							</FormGroup>
							<FormGroup row >
								<Button>
									{String.enter}
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
