import React from 'react';

import { Container, Header, BodyMain } from '../../style/style';
import String from '../../assets/string/string.json';

function App() {
	return (

		<Container>
			<Header> {String.nomeApp} </Header>
		</Container>

	);
}

export default App;
