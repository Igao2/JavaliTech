/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { CenterHeaderOn, ContainerHeaderOn, RightHeaderOn, HeaderIcon } 
	from '../../../assets/values/styles';
import logo from '../../../assets/images/icons/logo_white.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class HeaderContainerOn extends React.Component {
	render() {
		return (
			<ContainerHeaderOn>
				<CenterHeaderOn></CenterHeaderOn>
				<RightHeaderOn>
					<Button block color="danger" >{String.search}</Button>
				</RightHeaderOn>
			</ContainerHeaderOn>
		)
	}
}

export default HeaderContainerOn;