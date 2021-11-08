/* eslint-disable react/jsx-pascal-case */
// eslint-disable-next-line
import React from 'react';
import String from '../../../assets/values/string.json';

import { CenterHeaderOn, ContainerHeaderOn, RightHeaderOn, HeaderIcon, ContainerHeaderOn_MobMenu, ContainerHeaderOn_PcMenu }
	from '../../../assets/values/styles';
import logo from '../../../assets/images/icons/logo_white.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Button, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav,
	NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
	DropdownMenu, DropdownItem, NavbarText, Row, Col
} from 'reactstrap';
import PainelUser_menuMob from '../painel/menu_tmp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faEdit, faList, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class HeaderContainerOn extends React.Component {
	render() {
		return (
			<ContainerHeaderOn>

				{/* Visão em PC */}
				<ContainerHeaderOn_PcMenu />
				<ContainerHeaderOn_PcMenu>
					{String.menuUserWellcome}<b>{String.menuUser}</b>
				</ContainerHeaderOn_PcMenu>

				{/* Visão em Mobiles */}
				<ContainerHeaderOn_MobMenu
					href="#1"
					alt={String.menuEditUser}
					title={String.menuEditUser}>
					<FontAwesomeIcon icon={faUserEdit} />
				</ContainerHeaderOn_MobMenu>
				<ContainerHeaderOn_MobMenu
					href="#2"
					alt={String.menuAddOS}
					title={String.menuAddOS}>
					<FontAwesomeIcon icon={faEdit} />
				</ContainerHeaderOn_MobMenu>
				<ContainerHeaderOn_MobMenu
					href="#3"
					alt={String.menuListOS}
					title={String.menuListOS}>
					<FontAwesomeIcon icon={faList} />
				</ContainerHeaderOn_MobMenu>
				<ContainerHeaderOn_MobMenu
					href="#4"
					alt={String.munuSearchOS}
					title={String.munuSearchOS} >
					<FontAwesomeIcon icon={faSearch} />
				</ContainerHeaderOn_MobMenu>

				<ContainerHeaderOn_MobMenu
					href="#5"
					alt={String.menuExit}
					title={String.menuExit} >
					<FontAwesomeIcon icon={faSignOutAlt} />
				</ContainerHeaderOn_MobMenu>

				{/* <PainelUser_menuMob/> */}
				{/* <CenterHeaderOn></CenterHeaderOn>
				<RightHeaderOn>
					<Button block color="dark" onClick={function noRefCheck(){}} >{String.menu}</Button>
					<Button block color="dark" >{String.search}</Button>
					</RightHeaderOn> */}
			</ContainerHeaderOn>
		)
	}
}

export default HeaderContainerOn;