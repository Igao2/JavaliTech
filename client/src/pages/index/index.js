/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { BodyOff, BodyOffIcon_home, BodyOff_buttom, BodyOff_top_off, ContainerOff, FooterOff, HeaderOff } from '../../assets/values/styles';

import HeaderContainerOff from '../components/headers/header_off';
import HeaderContainerOn from '../components/headers/header_on';

import logo from '../../assets/images/icons/logo_black.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button } from 'reactstrap';

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

					{/* <HeaderContainerOn/> */}
					<HeaderContainerOff/>

				</HeaderOff>
				<BodyOff>

					<BodyOff_top_off>

						<h1>{String.nomeApp}</h1>
						<h5>{String.nomeApp_descricao}</h5>

					</BodyOff_top_off>
					<BodyOff_buttom>

						<h6>{String.search_OS}</h6>
						<Input bsSize="sm" />
						<Button block color="danger" >{String.search}</Button>

					</BodyOff_buttom>
					
				</BodyOff>
				<FooterOff>

					<p>{String.devs}</p>
					
				</FooterOff>
			</ContainerOff>
		</div >
	);
}

export default App;
