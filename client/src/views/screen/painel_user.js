/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import String from '../../assets/values/string.json';
import {
	BodyOn, ContainerOn, FooterOn,
	HeaderOn, AreaBodyLeft, AreaBodyRight,
	HeaderOn_Nav, HeaderIcon_Nav_complet, BodyOn_Nav
} from '../../assets/values/styles';

import HeaderContainerOn from '../components/headers/header_on';
import userInfosRequestManager from '../../dispatcher/userInfosRequest';

import { Redirect, NavLink } from "react-router-dom";

import logo from '../../assets/images/icons/logo_white.svg';
import Button_UserP from '../components/painel/button_userP';
import Footer_off from '../components/footers/footers_off';

/** Tela de bem vindo */
import ItemUser from '../components/painel/item_user';

/** Tela de editar informações do usuario */
import ItemEditUser from '../components/painel/item_editUser';

/** Tela de adicionar nova OS */
import ItemAddOs from '../components/painel/item_addOS';

/** Tela de lista de OS's */
import ItemListOs_On from '../components/painel/item_listOS_on';

/** Tela de busca avançada de OS */
import ItemSearch from '../components/painel/item_search';

/** Tela de login */
import ItemLoginOff from '../components/painel/item_loginOff';

/** Tela de deletar usuario */
import DeleteUser from '../components/painel/deleteUserAlert';

/** Tela de visualização avançada de OS */
import AdivancedViewOs from '../components/painel/adivanced_view_os';

/** Tela de editar OS */
import EditOs from '../components/painel/item_editOS';

const tokenManager = require('../../dispatcher/tokenManager');

/**
 * @function AppScreen-Painel_user
 * @description Constrói a tela do painel do usuário
 */
function App() {

	/** const useState para o redirecionamento de tela. */
	const redirect = useState(0);

	/** const useState para o redirecionamento para a tela inicial com a mensagens de "conta deletada com susseco". */
	const deleteRedirect = useState(0);

	/** const useState define a tela atual. */
	const [screen, setScreen] = useState(0);

	/** const useState armazena as informações do usuário. */
	const [userInfos, setUserInfos] = useState({
		"name": "",
		"email": "",
		"address": {},
		"telephone": "",
		"photo": []
	})

	/** useEffect de obtenção de dados do usuario = é executado quando a página carrega, odtem os dados do user em questão */
	useEffect(() => {
		userInfosRequestManager({ headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {

			if (typeof res.data.erro === 'undefined') {
				switch (res.data) {
					case 500: tokenManager.deleteToken(); redirect[1](1); break;

					case 400: tokenManager.deleteToken(); redirect[1](1); break;

					case 401: tokenManager.deleteToken(); redirect[1](1); break;

					case 417: tokenManager.deleteToken(); redirect[1](1); break;

					default:
						setUserInfos(res.data)
						if (window.location.href.indexOf("#") >= 0) setScreen(window.location.href.slice(-1));
						else setScreen(1);
				}
			} else { tokenManager.deleteToken(); redirect[1](1); }
		});
	}, []);

	/** Esta arrow function desloga o usuario e manda ele para a home. */
	const logout = () => { tokenManager.deleteToken(); redirect[1](1); }

	/** Esta arrow function encerra a session do usuario e manda ele para a home. */
	const deleteUserRedirect = () => { tokenManager.deleteToken(); deleteRedirect[1](1); }

	/** Esta arrow function troca o conteudo da tela de acordo com o valor da prorpiedade "name" do prorpio elemento que a chama. */
	const switchScreensFromEvent = event => setScreen(event.target.name);

	/** Esta arrow function troca o conteudo da tela de acordo com o valor da parametro "screenNumber". 
	* @param {number} screenNumber - número de identificação do novo conteúdo da tela.
	*/
	const switchScreensFromProps = (screenNumber) => setScreen(screenNumber);

	return (
		<div>
			{redirect[0] ? <Redirect to='/' /> : null}
			{deleteRedirect[0] ? <Redirect to='/#1' /> : null}
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
						{screen == "1" && <ItemUser {...({ userInfos, switchScreensFromProps })} />}
						{screen == "2" && <ItemEditUser {...({ userInfos, switchScreensFromProps })} />}
						{screen == "3" && <ItemAddOs {...({ userInfos, switchScreensFromProps })} />}
						{screen == "4" && <ItemListOs_On {...({ userInfos, switchScreensFromProps })} />}
						{screen == "5" && <ItemSearch {...({ userInfos, switchScreensFromProps })} />}
						{screen == "6" && <ItemLoginOff {...({ userInfos, switchScreensFromProps, logout })} />}
						{screen == "7" && <DeleteUser {...({ userInfos, switchScreensFromProps, deleteUserRedirect })} />}
						{screen == "8" && <AdivancedViewOs {...({ userInfos, switchScreensFromProps })} />}
						{screen == "9" && <EditOs {...({ userInfos, switchScreensFromProps })} />}


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
