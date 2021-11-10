/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { CenterHeaderOff, ContainerHeaderOff, LeftHeaderOff, RightHeaderOff, HeaderIcon } 
	from '../../../assets/values/styles';
import logo from '../../../assets/images/icons/logo_white.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class HeaderContainerOff extends React.Component {
	render() {
		return (
			<ContainerHeaderOff>
				<LeftHeaderOff>
					<HeaderIcon src={logo} alt="logo" />
				</LeftHeaderOff>
				<CenterHeaderOff></CenterHeaderOff>
				<RightHeaderOff>
					<Button block color="danger">{String.login}</Button>
				</RightHeaderOff>
			</ContainerHeaderOff>
		)
	}
}

export default HeaderContainerOff;