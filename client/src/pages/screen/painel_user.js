/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import { HeaderIcon, BodyOn, BodyOnIcon_home, BodyOn_buttom, 
	BodyOff_top_off, ContainerOn, FooterOn, 
	HeaderOn, AreaBodyLeft, AreaBodyRight,
	HeaderOn_Nav, HeaderIcon_Nav_pc, HeaderIcon_Nav_mob, FooterOn_Nav, BodyOn_Nav } from '../../assets/values/styles';

import HeaderContainerOn from '../components/headers/header_on';

import logoPc from '../../assets/images/icons/logo_white.svg';
import logoMob from '../../assets/images/icons/logo02_white.svg';
import Button_UserP from '../components/painel/button_userP';


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

			<ContainerOn>
				<AreaBodyLeft>

				<HeaderOn_Nav>
					<HeaderIcon_Nav_pc src={logoPc} alt="logo" />
					<HeaderIcon_Nav_mob src={logoMob} alt="logo" />
				</HeaderOn_Nav>
				<BodyOn_Nav>

				</BodyOn_Nav>
				<FooterOn_Nav>
				</FooterOn_Nav>

				</AreaBodyLeft>
				<AreaBodyRight>
					<HeaderOn>

						<HeaderContainerOn/>

					</HeaderOn>
				</AreaBodyRight>
				{/* <BodyOff>

					<BodyOff_top_off>

						<h1>{String.nomeApp}</h1>
						<h5>{String.nomeApp_descricao}</h5>

					</BodyOff_top_off>
					<BodyOff_buttom>

						<h6>{String.search_OS}</h6>

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
					
				</FooterOff> */}
			</ContainerOn>
		</div >
	);
}

export default App;
