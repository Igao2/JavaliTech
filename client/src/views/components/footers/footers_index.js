/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Logo_IMG_Footer, NavContainderFooter, NavLogoFooter, NavMenuFooter } from '../../../styles/styles';

import logo from '../../../assets/images/icons/logo.svg';

function footer_index() {
	return (
		<div>
			<NavContainderFooter>
				<NavLogoFooter>
					<p>SELET GAME - 2021</p>
				</NavLogoFooter>
				<NavMenuFooter>
					<Logo_IMG_Footer src={logo} alt="logo" />
				</NavMenuFooter>
			</NavContainderFooter>

		</div>
	);
}

export default footer_index;