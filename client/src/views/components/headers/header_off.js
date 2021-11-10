/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { CenterHeaderOff, ContainerHeaderOff, LeftHeaderOff, RightHeaderOff, HeaderIcon }
	from '../../../assets/values/styles';
import logo from '../../../assets/images/icons/logo_white.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { NavLink } from "react-router-dom";

class HeaderContainerOff extends React.Component {
	render() {
		return (
			<ContainerHeaderOff>
				<LeftHeaderOff>
					<NavLink to="/">
						<HeaderIcon src={logo} alt="logo" />
					</NavLink>
				</LeftHeaderOff>
				<CenterHeaderOff></CenterHeaderOff>
				<RightHeaderOff>
					<NavLink to="/login">
						<Button block color="danger">{String.login}</Button>
					</NavLink>
				</RightHeaderOff>
			</ContainerHeaderOff>
		)
	}
}

export default HeaderContainerOff;