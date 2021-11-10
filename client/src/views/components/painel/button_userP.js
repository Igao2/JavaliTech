/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import {
	CenterHeaderOn, ContainerHeaderOn, RightHeaderOn,
	HeaderIcon_Nav_complet, HeaderOn_Nav, BodyOn, FooterOn, 
	ContainerOn, ButtonMenu_UserP, ContainerHeaderOn_LatPcMenu
}
	from '../../../assets/values/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt ,faUserEdit, faEdit, faList, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Button_UserP extends React.Component {
	render() {
		return (
			<div>
				<ContainerHeaderOn_LatPcMenu
					href="#0"
					alt={String.menuUser}
					title={String.menuUser}>
						<FontAwesomeIcon icon={faUserAlt} />
						{String.menuUser}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#1"
					alt={String.menuEditUser}
					title={String.menuEditUser}>
						<FontAwesomeIcon icon={faUserEdit} />
						{String.menuEditUser}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#2"
					alt={String.menuAddOS}
					title={String.menuAddOS}>
						<FontAwesomeIcon icon={faEdit} />
						{String.menuAddOS_small}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#3"
					alt={String.menuListOS}
					title={String.menuListOS}>
						<FontAwesomeIcon icon={faList} />
						{String.menuListOS_small}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#4"
					alt={String.munuSearchOS}
					title={String.munuSearchOS}>
						<FontAwesomeIcon icon={faSearch} />
						{String.munuSearchOS}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#5"
					alt={String.menuExit}
					title={String.menuExit}>
						<FontAwesomeIcon icon={faSignOutAlt} />
						{String.menuExit}
				</ContainerHeaderOn_LatPcMenu>
			</div>

		)
	}
}

export default Button_UserP;