import React from 'react';
import String from '../../../assets/values/string.json';

/**
 * @class
 * @description Componente que gera o footer
 */
class Footer_on extends React.Component {
	render() {
		return (
			<div>

				<p>{String.devs}</p>

			</div >
		)
	}
}

export default Footer_on;