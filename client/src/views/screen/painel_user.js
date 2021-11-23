/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import {
	HeaderIcon, BodyOn, BodyOnIcon_home, BodyOn_buttom,
	BodyOff_top_off, ContainerOn, FooterOn,
	HeaderOn, AreaBodyLeft, AreaBodyRight,
	HeaderOn_Nav, HeaderIcon_Nav_complet, FooterOn_Nav, BodyOn_Nav
} from '../../assets/values/styles';

import HeaderContainerOn from '../components/headers/header_on';
import userInfosRequestManager from '../../dispatcher/userInfosRequest';

import { Redirect, NavLink } from "react-router-dom";

import logo from '../../assets/images/icons/logo_white.svg';
import Button_UserP from '../components/painel/button_userP';
import Footer_off from '../components/footers/footers_off';
import itemUser from '../components/painel/item_user';
import ItemUser from '../components/painel/item_user';
import ItemEditUser from '../components/painel/item_editUser';
import ItemAddOs from '../components/painel/item_addOS';
import ItemListOs_On from '../components/painel/item_listOS_on';
import ItemSearch from '../components/painel/item_search';
import ItemLoginOff from '../components/painel/item_loginOff';
import ViewOpenOs_on from '../components/painel/view_openOs_on';
import InfoAlert from '../components/painel/info_alert';

const tokenManager = require('../../dispatcher/tokenManager');

function App() {

	/** const useState para o redirecionamento de tela. */
	const redirect = useState(0);

	const [screen, setScreen] = useState(0);

	const [userInfos, setUserInfos] = useState({
		"name": "",
		"email": "",
		"address": {},
		"telephone": "",
		"photo": []
	})

	useEffect(() => {
		userInfosRequestManager({ headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {
			switch (res.data) {
				case 500:
					alert("erro do sistema")
					break;

				case 400:
					redirect[1](1);
					break;

				default:
					setUserInfos(res.data)
					if (window.location.href.indexOf("#") >= 0) setScreen(window.location.href.slice(-1));
					else setScreen(1);
			}
		});
	}, []);

	const logout = () => { tokenManager.deleteToken(); redirect[1](1); }

	const switchScreensFromEvent = event => setScreen(event.target.name);

	const switchScreensFromProps = (name) => setScreen(name);

	return (
		<div>
			{redirect[0] ? <Redirect to='/' /> : null}
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
						<NavLink to="/">
							<HeaderIcon_Nav_complet src={logo} alt="logo" />
						</NavLink>

					</HeaderOn_Nav>
					<BodyOn_Nav>
						<Button_UserP {...({ userInfos, switchScreensFromEvent, screen })} />
					</BodyOn_Nav>
					{/* <FooterOn_Nav>
					</FooterOn_Nav> */}

				</AreaBodyLeft>
				<AreaBodyRight>
					<HeaderOn>

						<HeaderContainerOn {...({ userInfos, switchScreensFromEvent, screen })} />

					</HeaderOn>
					<BodyOn>
						{screen == 1 && <ItemUser {...({ userInfos, switchScreensFromProps })} />}
						{screen == 2 && <ItemEditUser {...({ userInfos, switchScreensFromProps })} />}
						{screen == 3 && <ItemAddOs {...({ userInfos, switchScreensFromProps })} />}
						{screen == 4 && <ItemListOs_On {...({ userInfos, switchScreensFromProps })} />}
						{screen == 5 && <ItemSearch {...({ userInfos, switchScreensFromProps })} />}
						{screen == 6 && <ItemLoginOff {...({ userInfos, switchScreensFromProps, logout })} />}

						{/* <ItemUser /> */}
						{/* <ItemEditUser /> */}
						{/* <ItemAddOs /> */}
						{/* <ItemListOs_On /> */}
						{/* <ItemSearch /> */}
						{/* <ItemLoginOff /> */}

						{/* *** Outros itens *** */}
						{/* <ViewOpenOs_on /> */}
						{/* <InfoAlert
							titleAlert={String.titleAlert}
							describeAlert={String.describeAlert}
						/> */}

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
