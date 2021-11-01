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

	h5{
		text-align: center;
    align-self: flex-top;
    color: #444;
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
	}

	button{
		margin-top: 10px;
    width: 100%;
		height: 40px;
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
		background-color: #d30000;
		border-color: #d30000;
	}

	.btn:hover{
		background-color: #a00;
		border-color: #a00;
	}
`;
