/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import {
	CenterHeaderOn, ContainerHeaderOn, RightHeaderOn,
	HeaderIcon_Nav_complet, HeaderOn_Nav, BodyOn, FooterOn,
	ContainerOn, ButtonMenu_UserP, ContainerHeaderOn_LatPcMenu, ItemIcoMenu
}
	from '../../../assets/values/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import calendar_plus_solid from '../../../assets/images/fontwesome/calendar_plus_solid.svg';
import list_alt_solid from '../../../assets/images/fontwesome/list_alt_solid.svg';
import search_solid from '../../../assets/images/fontwesome/search_solid.svg';
import sign_out_alt_solid from '../../../assets/images/fontwesome/sign_out_alt_solid.svg';
import user_edit_solid from '../../../assets/images/fontwesome/user_edit_solid.svg';
import user_solid from '../../../assets/images/fontwesome/user_solid.svg';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserAlt ,faUserEdit, faEdit, faList, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Button_UserP extends React.Component {
	render() {
		return (
			<div>
				<ContainerHeaderOn_LatPcMenu
					href="#1"
					name="1"
					{...this.props.screen == 1 && { active: true }}
					onClick={this.props.switchScreensFromEvent}
					alt={String.menuUser}
					title={String.menuUser}>
					<ItemIcoMenu src={user_solid} />
					{String.menuUser}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#2"
					name="2"
					{...this.props.screen == 2 && { active: true }}
					onClick={this.props.switchScreensFromEvent}
					alt={String.menuEditUser}
					title={String.menuEditUser}>
					<ItemIcoMenu src={user_edit_solid} />
					{String.menuEditUser}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#3"
					name="3"
					{...this.props.screen == 3 && { active: true }}
					onClick={this.props.switchScreensFromEvent}
					alt={String.menuAddOS}
					title={String.menuAddOS}>
					<ItemIcoMenu src={calendar_plus_solid} />
					{String.menuAddOS_small}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#4"
					name="4"
					{...this.props.screen == 4 && { active: true }}
					onClick={this.props.switchScreensFromEvent}
					alt={String.menuListOS}
					title={String.menuListOS}>
					<ItemIcoMenu src={list_alt_solid} />
					{String.menuListOS_small}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#5"
					name="5"
					{...this.props.screen == 5 && { active: true }}
					onClick={this.props.switchScreensFromEvent}
					alt={String.munuSearchOS}
					title={String.munuSearchOS}>
					<ItemIcoMenu src={search_solid} />
					{String.munuSearchOS}
				</ContainerHeaderOn_LatPcMenu>

				<ContainerHeaderOn_LatPcMenu
					href="#6"
					name="6"
					{...this.props.screen == 6 && { active: true }}
					onClick={this.props.switchScreensFromEvent}
					title={String.menuExit}>
					<ItemIcoMenu src={sign_out_alt_solid} />
					{String.menuExit}
				</ContainerHeaderOn_LatPcMenu>
			</div>

		)
	}
}

export default Button_UserP;