/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import {
	HeaderIcon, BodyOn, BodyOnIcon_home, BodyOn_buttom,
	BodyOff_top_off, ContainerOn, FooterOn,
	HeaderOn, AreaBodyLeft, AreaBodyRight,
	HeaderOn_Nav, HeaderIcon_Nav_complet, FooterOn_Nav, BodyOn_Nav, ContainerHeaderOn_LatPcMenu, ItemIcoMenu
} from '../../assets/values/styles';

import calendar_plus_solid from '../../assets/images/fontwesome/calendar_plus_solid.svg';
import list_alt_solid from '../../assets/images/fontwesome/list_alt_solid.svg';
import search_solid from '../../assets/images/fontwesome/search_solid.svg';
import sign_out_alt_solid from '../../assets/images/fontwesome/sign_out_alt_solid.svg';
import user_edit_solid from '../../assets/images/fontwesome/user_edit_solid.svg';
import user_solid from '../../assets/images/fontwesome/user_solid.svg';


import HeaderContainerOn from '../components/headers/header_on';

import logo from '../../assets/images/icons/logo_white.svg';
import Button_UserP from '../components/painel/button_userP';
import Footer_off from '../components/footers/footers_off';
import itemUser from '../components/painel/item_user';
import ItemUser from '../components/painel/item_user';
import Teste from "./teste";
import Teste2 from "./teste2";
import Teste3 from "./teste3";


function App() {

	const teste = useState(1);

	const butomClick = event => {
		if (event.target.name == 6) alert("sair")
		else teste[1](event.target.name)
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

			<ContainerOn>
				<AreaBodyLeft>

					<HeaderOn_Nav>
						<HeaderIcon_Nav_complet src={logo} alt="logo" />
					</HeaderOn_Nav>

					<BodyOn_Nav>
						<div>
							<ContainerHeaderOn_LatPcMenu
								name="1"
								onClick={butomClick}
								alt={String.menuUser}
								title={String.menuUser}>
								<ItemIcoMenu src={user_solid} />
								{String.menuUser}
							</ContainerHeaderOn_LatPcMenu>

							<ContainerHeaderOn_LatPcMenu
								name="2"
								onClick={butomClick}
								alt={String.menuEditUser}
								title={String.menuEditUser}>
								<ItemIcoMenu src={user_edit_solid} />
								{String.menuEditUser}
							</ContainerHeaderOn_LatPcMenu>

							<ContainerHeaderOn_LatPcMenu
								name="3"
								onClick={butomClick}
								alt={String.menuAddOS}
								title={String.menuAddOS}>
								<ItemIcoMenu src={calendar_plus_solid} />
								{String.menuAddOS_small}
							</ContainerHeaderOn_LatPcMenu>

							<ContainerHeaderOn_LatPcMenu
								name="4"
								onClick={butomClick}
								alt={String.menuListOS}
								title={String.menuListOS}>
								<ItemIcoMenu src={list_alt_solid} />
								{String.menuListOS_small}
							</ContainerHeaderOn_LatPcMenu>

							<ContainerHeaderOn_LatPcMenu
								name="5"
								onClick={butomClick}
								alt={String.munuSearchOS}
								title={String.munuSearchOS}>
								<ItemIcoMenu src={search_solid} />
								{String.munuSearchOS}
							</ContainerHeaderOn_LatPcMenu>

							<ContainerHeaderOn_LatPcMenu
								name="6"
								onClick={butomClick}
								alt={String.menuExit}
								title={String.menuExit}>
								<ItemIcoMenu src={sign_out_alt_solid} />
								{String.menuExit}
							</ContainerHeaderOn_LatPcMenu>
						</div>

					</BodyOn_Nav>

					{/* <FooterOn_Nav>
					</FooterOn_Nav> */}

				</AreaBodyLeft>
				<AreaBodyRight>
					<HeaderOn>

						<HeaderContainerOn />

					</HeaderOn>
					<BodyOn>
						{teste[0] == 1 && <ItemUser />}
						{teste[0] == 2 && <Teste />}
						{teste[0] == 3 && <Teste2 />}
						{teste[0] == 4 && <Teste3 />}
						{teste[0] == 5 && <Teste3 />}
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
