/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import {
	HeaderIcon, BodyOn, BodyOnIcon_home, BodyOn_buttom,
	BodyOff_top_off, ContainerOn, FooterOn,
	HeaderOn, AreaBodyLeft, AreaBodyRight,
	HeaderOn_Nav, HeaderIcon_Nav_complet, FooterOn_Nav, BodyOn_Nav
} from '../../assets/values/styles';

import HeaderContainerOn from '../components/headers/header_on';

import logo from '../../assets/images/icons/logo_white.svg';
import Button_UserP from '../components/painel/button_userP';
import Footer_off from '../components/footers/footers_off';
import itemUser from '../components/painel/item_user';
import ItemUser from '../components/painel/item_user';
import ItemEditUser from '../components/painel/item_editUser';


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
						<HeaderIcon_Nav_complet src={logo} alt="logo" />
					</HeaderOn_Nav>
					<BodyOn_Nav>
						<Button_UserP />
					</BodyOn_Nav>
					{/* <FooterOn_Nav>
					</FooterOn_Nav> */}

				</AreaBodyLeft>
				<AreaBodyRight>
					<HeaderOn>

						<HeaderContainerOn />

					</HeaderOn>
					<BodyOn>

						{/* Painel do Item /selecionado */}
						{/* <ItemUser/> */}
						<ItemEditUser />

					</BodyOn>
					<FooterOn>

						<Footer_off />

					</FooterOn>
				</AreaBodyRight>
			</ContainerOn>
		</div >
	);
}

export default App;
