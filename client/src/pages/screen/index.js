/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOffIcon_home, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, Form, FormGroup } from 'reactstrap';
import Footer_auto from '../components/footers/footers';

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

					<HeaderContainerOff/>

				</HeaderOff>
				<BodyOff>

					<BodyOff_top_off>

						<h1>{String.nomeApp}</h1>
						<h5>{String.nomeApp_descricao}</h5>

					</BodyOff_top_off>
					<BodyOff_buttom>

						<h6>{String.search_OS}</h6>

						{/* invalid: vermelho | valid: verde */}
						<Form>
							<FormGroup row>
									<Input
										valid
										id="cod_OS"
										name="number"
										placeholder={String.cod_OS}
										type="number"
									/>
							</FormGroup>
							<FormGroup row >
									<Button>
										{String.search}
									</Button>
							</FormGroup>
						</Form>

					</BodyOff_buttom>
					
				</BodyOff>
				<FooterOff>

					<Footer_auto/>
					
				</FooterOff>
			</ContainerOff>
		</div >
	);
}

export default App;
