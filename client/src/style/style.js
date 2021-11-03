import styled from 'styled-components';

/**
 *  JavaliTech Team
 * 
 *  Feito por:
 *  @author CARLOS EDUARDO SANTOS BARBOSA DE CARVALHO 
 *  @author CESAR APARECIDO LOURENCO
 *  @author DENILSON FABIANO DE ARAUJO
 *  @author ELEAZAR JOSE RIBEIRO
 *  @author IGOR DA SILVA COSTA
 *  @author LEANDRO DE MEIRELLES
 * 
 *  @version 1.0
 * 
 */

//-------------------------------------------------------------
export const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 12vh 76vh 12vh;
	grid-template-areas: "h h" "b b" "f f";
    background-color: #f1f1f1;
	
	margin: auto;
	justify-content: center;
`;

export const Header = styled.header`
	grid-area: h;
	background-color: #d61515;
`;

export const Footer = styled.footer`
	/* background-color: red; */
	grid-area: f;
	background-color: #23272a;
`;

export const BodyMain = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: b;
	grid-template-areas: "m m";
`;

export const Main = styled.main`
	/* background-color: blue; */
	grid-area: m;
	overflow:auto; 

	&::-webkit-scrollbar {
        width: 12px;
		height: 12px;
    }

	&::-webkit-scrollbar-track {
		background: #0A090F;
  	}

  	&::-webkit-scrollbar-thumb {
  		background-color: #301A3A;    /* color of the scroll thumb */
  		border-radius: 20px;
	}

`;

export const Aside = styled.aside`
	/* background-color: green; */
	grid-area: a;
`;

export const CardContainder = styled.div`
	margin: auto;
	max-width: 1000px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 20px;
	justify-content: center;
	padding: 10px;
`;


export const CardImage = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
	border-radius: 5px 5px 0px 0px;
`;

export const CardBody = styled.div`
	background-color: #222;
	padding: 0px 0px 10px;
	color: #f5f5f5;
	text-shadow: 0 0 10px #fff3;
	border-radius: 5px;

	h2{
		padding: 0px 15px;
		padding-top: 20px;
		font-family: 'Staatliches', cursive !important;
	}

	p{
		padding: 0px 15px;
		font-size: medium;
		width: 100%;
		height: 100px;
    	line-height: 1.5em;
    	position: relative;
		/* white-space: nowrap; */
		overflow: hidden;
    	text-overflow: ellipsis;
    	-o-text-overflow: ellipsis;
	}

	&:hover{
		background-color: #333;
	}
`;

export const NavContainder = styled.div`
	margin: auto;
	display: grid;
	grid-template-columns: 1fr 0.25fr;
	grid-template-rows: 8vh;
	grid-template-areas: "m l";
	justify-content: center;

	@media(max-width: 880px) {
		grid-template-columns: 1fr;
	}
`;

export const NavContainderOff = styled.div`
	margin: auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 8vh;
	grid-template-areas: "l l";
	justify-content: center;

	@media(max-width: 880px) {
		grid-template-columns: 1fr;
	}
`;

export const NavMenu = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: m;
	padding: 7px 5px;

	nav{
		padding: 0 15px;
		align-items: center;
		position: relative;
		border-radius: 5px;
		z-index: 9999;
		background-color: #291E31;
		box-shadow: 0px 0px 5px #291E31;
	}

	.show li{
		padding-right: 0px;
		padding-bottom: 10px;
	}

	li{
		padding-right: 10px;
	}


`;

export const NavLogo = styled.div`
	justify-content: end;
	display: grid;
	grid-area: l;

	grid-template-columns: 1fr 8vh;
	
	h2{
		padding-top: 5px;
		padding-left: 10px;
		font-size: x-large;
		font-family: 'Monoton', cursive !important;
		align-content: center;
		align-items: center;
		align-self: center;
		width: 100%;
		text-align: right;
		color: #9E9AA2;
	}

	@media(max-width: 880px) {
		grid-template-columns: 1fr;

		h2{
			display: none;
		}
	}
`;

export const NavLogoOff = styled.div`
	justify-content: left;
	justify-self: left;
	justify-items: left;
	display: grid;
	grid-area: l;
		width: 100%;

	grid-template-columns: auto auto;
	
	grid-template-areas: "lt ll";
	
	h2{
		width: 100%;
		padding-top: 5px;
		padding-left: 10px;
		font-size: x-large;
		font-family: 'Monoton', cursive !important;
		align-content: center;
		align-items: center;
		align-self: center;
		text-align: right;
		color: #9E9AA2;
	}

	@media(max-width: 880px) {
		justify-content: center;
		justify-self: center;
		justify-items: center;
		grid-template-columns: 100%;

		h2{
			display: none;
		}
	}
`;

export const NavContainderFooter = styled.div`
	margin: auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 8vh;
	grid-template-areas: "m l";
	justify-content: center;

	@media(max-width: 880px) {
		grid-template-columns: 1fr;
	}
`;

export const NavLogoFooter = styled.div`
	align-items: center;
	justify-content: center;
	display: grid;
	grid-area: l;
	grid-template-columns: 1fr;

	p{
		text-align: end;
		color: #9E9AA2;
		font-size: small;
		margin-top: 0px;
		margin-right: 15px;
		margin-bottom: 0px;
	}
`;

export const NavMenuFooter = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: m;

`;

export const Logo_IMG = styled.img`
  width: 15vh;
  height: 100%;
  padding: 20px;
`;

export const Logo_IMG_Footer = styled.img`
  width: 10vh;
  height: 100%;
`;

export const ContainerTemp = styled.div`
	max-width: 1000px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 27vh 60vh;
	grid-template-areas: "ct ct" "cb cb";
	
	margin: auto;
	justify-content: center;
`;

export const ContainerTempTop = styled.div`
	/* background-color: yellow; */
	grid-area: ct;
	justify-content: center;
    align-self: center;

	h1{
		padding: 0px 10px;
		text-align: center;
		font-size: calc(50px + 1vw);
		font-family: 'Monoton', cursive !important;
	}
`;

export const ContainerTempButton = styled.div`
	/* background-color: yellow; */
	grid-area: cb;
	font-size: calc(8px + 1vw);
	justify-self: center;

	ul{ 
		border-radius: 5px;
		background-color: #fff2;
		padding: 10px 50px;
		width: fit-content;
		list-style-type: none;
	}
	li{
		font-family: 'Text Me One', sans-serif !important;
	}

	button{
		font-size: calc(8px + 1vw);
	}

	.row{
		width: 100%;
	}

	.col-6{
		font-weight: bold;
		align-self: center;
	}

`;

export const ProfilePhoto = styled.div`
	border-radius: 50%;
    overflow: hidden;
    position: relative;
    border-color: #ffffff87;
    border-width: 1.3px;
    border-style: solid;
    box-shadow: 0px 0px 27px #000 inset;
    width: 150px;
    height: 150px;
	margin: auto;

 	img {
    	position: absolute;
	}
`;