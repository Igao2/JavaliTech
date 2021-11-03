/* eslint-disable-next-line */
import styled from 'styled-components';


// Estilo de telas MODO OFF
export const ContainerOff = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 15vh 75vh 10vh;
	grid-template-areas: "h h" "b b" "f f";
	
	margin: auto;
	justify-content: center;
`;

export const HeaderOff = styled.header`
	grid-area: h;
	color: #fff !important;
	background-color: #222;
`;

export const FooterOff = styled.footer`
	grid-area: f;
	background-color: #2228;

	padding: 10px 20px;
	color: #fff;
	text-align: right;

	margin-block-start: auto;
`;

export const BodyOff = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: b;
	grid-template-areas: "m m";

	grid-template-rows: 1fr 1fr;
	grid-template-areas: "bt bt" "bb bb";

	
	width: 1000px;
	margin: 0 auto;

	@media(max-width: 1000px) {
		width: 100%;
	}
`;

//BodyOff
export const BodyOff_top_off = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: bt;


	padding: 20px 40px;

	h1{
		text-align: center;
    align-self: flex-end;
    color: #222;
    font-weight: bold;
	}

	h2{
		text-align: center;
    align-self: flex-end;
    color: #222;
    font-weight: bold;
	}

	h5{
		text-align: center;
    align-self: flex-top;
    color: #444;
	}

	.alert{
		margin-top: 10px;
    width: 100%;
		padding: 20px;
		
    align-self: center;
    text-align: center;
	}
`;

export const BodyOffIcon_home = styled.img`
	justify-self: center;
  width: 40vh;
`;

export const BodyOff_buttom = styled.div`
	grid-area: bb;
	margin-block-end: auto;

	text-align-last: center;
	padding: 10px 40px;

	input{
		height: 40px;
		margin-bottom: 10px;
	}

	input[type=text], input[type=password], input[type=number] {
		text-align: left;
	}

	button{
		margin-top: 10px;
    width: 100%;
		height: 40px;
	}

	.btn{
		background-color: #d30000;
		border-color: #d30000;
	}

	.btn:hover{
		background-color: #a00;
		border-color: #a00;
	}							
`;

// Estilo Geral topo

//HeaderOFF
export const ContainerHeaderOff = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	grid-template-rows: 14vh;
	
	padding: 5px;

	margin: auto;
	justify-content: center;

`;

export const LeftHeaderOff = styled.div`
	justify-content: center;
	text-align: center;
`;

export const CenterHeaderOff = styled.div``;

export const RightHeaderOff = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	.btn{
		background-color: #d30000;
		border-color: #d30000;
	}

	.btn:hover{
		background-color: #a00;
		border-color: #a00;
	}
`;

export const HeaderIcon = styled.img`
  width: 15vh;
  height: 100%;
`;


// Estilo de telas MODO On
export const ContainerOn = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr;
	
	margin: auto;
	justify-content: center;

	@media(max-width: 1000px) {
		grid-template-columns: 0r 4fr;
	}
	
`;

export const AreaBodyLeft = styled.nav`
	display: grid;
	grid-template-columns: 1fr;
	background-color: #222;

	grid-template-rows: 15vh 75vh 10vh;
	grid-template-areas: "hl hl" "bl bl" "fl fl";
`;

export const AreaBodyRight = styled.div`
	display: grid;
	
	grid-template-columns: 1fr;

	grid-template-rows: 15vh 75vh 10vh;
	grid-template-areas: "hr hr" "br br" "fr fr";
`;

export const HeaderOn = styled.header`
	grid-area: hr;
	color: #fff !important;
	background-color: #d30000;
`;

export const HeaderOn_Nav = styled.header`
	grid-area: hl;
	color: #fff !important;
		
	width: 100%;
	// border-bottom: 2px solid #fff2;
	text-align: center;
`;

export const HeaderIcon_Nav_pc = styled.img`
  width: 15vh;
  height: 100%;
	display: inline;

	@media(max-width: 1000px) {
		display: none;
	}
`;

export const HeaderIcon_Nav_mob = styled.img`
  width: 15vh;
  height: 100%;
	display: none;
	padding: 0 20px;

	@media(max-width: 1000px) {
		display: inline;
	}
`;

export const FooterOn = styled.footer`
	grid-area: fr;
	background-color: #2228;

	padding: 10px 20px;
	color: #fff;
	text-align: right;

	margin-block-start: auto;
`;

export const FooterOn_Nav = styled.footer`
	grid-area: fl;
	background-color: #2228;

	padding: 10px 20px;
	color: #fff;
	text-align: right;

	margin-block-start: auto;
`;

export const BodyOn = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: b;
	grid-template-areas: "m m";

	grid-template-rows: 1fr 1fr;
	grid-template-areas: "bt bt" "bb bb";

	
	width: 1000px;
	margin: 0 auto;

	@media(max-width: 1000px) {
		width: 100%;
	}
`;

export const BodyOn_Nav = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: b;
	grid-template-areas: "m m";

	grid-template-rows: 1fr 1fr;
	grid-template-areas: "bt bt" "bb bb";

`;


//HeaderOn
export const ContainerHeaderOn = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-template-rows: 14vh;

	padding: 5px;
	
	margin: auto;
	justify-content: center;

`;

export const CenterHeaderOn = styled.div``;

export const RightHeaderOn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	.btn{
		background-color: #222;
		border-color: #222;
	}

	.btn:hover{
		background-color: #444;
		border-color: #444;
	}
`;
