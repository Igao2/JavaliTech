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

export const BodyOff = styled.main`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: b;
	grid-template-areas: "m m";

	grid-template-rows: 1fr 1fr;
	grid-template-areas: "bt bt" "bb bb";

	overflow: auto;
	width: 1000px;
	margin: 20px auto 0;

	@media(max-width: 1024px) {
		width: 100%;
	}
`;

//BodyOff
export const BodyOff_top_off = styled.main`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: bt;

	overflow: auto;
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

export const BodyOff_buttom = styled.main`
	grid-area: bb;
	margin-block-end: auto;

	overflow: auto;
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

export const ParagrafLeftGeral = styled.p`
	text-align-last: left;

	div.dataItem{
		padding: 10px;
    	background: #eee;
	}

	div.statusItem{
		padding: 10px;
    	background: #fafafa;
	}
`;

export const FotoCentoOitenta = styled.img`
	width: 180px;
	height: 180px;
	background: #eee;
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

	@media(max-width: 1024px) {
		grid-template-columns: 0px 4fr;
	}
	
`;

export const AreaBodyLeft = styled.div`
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

	
	@media(max-width: 1024px) {
		grid-template-rows: 10vh 80vh 10vh;
	}
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
	text-align: center;
`;

export const HeaderIcon_Nav_complet = styled.img`
	width: 100%;
	height: 100%;
	padding: 30px;
	display: inline;

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

export const BodyOn = styled.main`
	display: grid;
	grid-template-columns: 1fr;
	grid-area: br;
	// grid-template-areas: "m m";

	grid-template-rows: 1fr 1fr;
	grid-template-areas: "bt bt" "bb bb";

	overflow: auto;
	width: 1000px;
	margin: 20px auto 0px;

	background: #fff;
	box-shadow: 0px 5px 10px #0002;
    border-radius: 5px;

	@media(max-width: 1280px) {
		width: 100%;
		margin: 0 auto;
	}


`;

export const BodyOn_Nav = styled.main`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-areas: "bl bl";

	// grid-template-rows: 1fr 1fr;

	overflow: auto;

	a:hover{
		color: #fff;
		background: #d30000aa;
		border-left: 8px solid #fff6;
		
		border-bottom: 1px solid #d3000088;
		border-top: 1px solid #d3000088;
	}

	a:active, a:focus {
		color: #222;
		background: #fff;
		border-left: 8px solid #fff;

		
		border-bottom: 1px solid #fff1;
		border-top: 1px solid #fff1;

		img {
			filter: brightness(0);
		}
	}



`;

export const ButtonMenu_UserP = styled.div`
	width: 100%;
	height: 40px;
	background: #f00;
`;


//HeaderOn
export const ContainerHeaderOn = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-template-rows: 14vh;

	padding: 5px;
	
	margin: auto;
	justify-content: center;

	@media(max-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		padding: 2px;
		grid-template-rows: 10vh;
	}

	a:hover{
		color: #fff;
		background: #FFf4;
		border-bottom: 8px solid #fff6;
	}

	a:active, a:focus, a[active]{
		color: #222;
		background: #FFf;
		border-bottom: 0px solid #b30000;

		img {
			filter: brightness(0);
		}
	}

	img {
		width: 3vh !important;
		height: 3vh;
	}
`;

export const ContainerHeaderOn_MobMenu = styled.a`
	display: none;	
	margin: 0 auto;
    align-self: center;

	text-decoration: none;
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 15px 0;
	font-size: medium;

	color: ${props => props.active ? "#fff" : "#222"};;
    background: ${props => props.active ? "#FFf4" : "transparent"};
	border-bottom:${props => props.active ? "8px solid #fff6" : "0px solid #b30000"};

	img {
		margin:0px;
	}
	@media(max-width: 1024px) {
		display: inline;
		font-size: small;
	}

`;

export const ContainerHeaderOn_LatPcMenu = styled.a`
	display: block;	
	margin: 0 auto;

	text-align: start;

	text-decoration: none;
	color: ${props => props.active ? "#222" : "#fff"};
    height: auto;
    width: 100%;
    padding: 20px 0 15px 10px;
	font-size: medium;

	img {
		filter:${props => props.active ? "brightness(0)" : "brightness(1)"}
	}

		
	background: ${props => props.active ? "#FFf" : "#222"};
	border-bottom: ${props => props.active ? "0px solid #b30000" : "1px solid #fff1"};
	border-top: 1px solid #fff1;
	border-left: ${props => props.active ? "8px solid #fff" : "none"};
	@media(max-width: 1024px) {
		display: none;
	}

	svg{
		margin: 0 10px 0 5px;
	}

`;



export const ContainerHeaderOn_PcMenu = styled.div`
	display: inline;	
	margin: 0 auto;
    align-self: center;

	@media(max-width: 1024px) {
		display: none;
	}
`;

export const CenterHeaderOn = styled.div``;

export const RightHeaderOn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	.btn{
		margin: auto 5px;
		background-color: #222;
		border-color: #222;
	}

	.btn:hover{
		background-color: #444;
		border-color: #444;
	}
`;

// Painel User
export const ItemMsgUser = styled.h4`
	padding: 20px 10px 5px;
`;

export const ItemIcoMenu = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 10px;

`;

export const ItemDiv = styled.hr`
	margin: 10px 0 15px;	
`;

export const AlertDelet = styled.div`
	padding: 20px 20px;
	background: #eee;
`;

export const ItemColAvatar = styled.div`
	width: 100%;
	text-align: center;
	display: grid;
    text-align: center;
    justify-content: center;
	justify-items: center;

	padding: 10px;
    background: #efefef;

	height: 100%;
    align-content: center;
	
	// border-radius: 200px;
`;

export const ItemAvatar = styled.img`
	width: 120px;
	height: 120px;
	border: 1px solid #ffffff87;
	// border-radius: 200px;
	fill: #fff;
	
`;

export const ItemColText = styled.div`
	display: grid;
    align-items: center;
	
	height: 100%;

	p{
		display: grid;
		height: 100%;
		align-items: center;
		height: 100%;
		font-size: medium;
	}

	@media(max-width: 1024px) {
		margin: 5px 0 0;
	}
`;

export const ItemColTextOS = styled.div`
	display: grid;
    align-items: center;
	
	height: 100%;

	p{
		display: grid;
		height: 100%;
		align-items: center;
		height: 100%;
		font-size: medium;
	}

	@media(max-width: 1024px) {
		margin: 5px 0 0;
	}
`;

export const QuadrosOS = styled.div`
	background: #fff;
	padding: 10px;
	border: 1px solid #dee2e6!important;
	margin: 0px 0px 10px;
	border-radius: 5px;
`;

export const ProfilePhoto = styled.div`
	border-radius: 10px;
    overflow: hidden;
    position: relative;
	border: 1px solid #666;
    width: 150px;
    height: 150px;
	margin: auto;
	background: url(${(props) => props.imgUrl});  

 	img {
    	position: absolute;
	}
`;

export const PaginationRed = styled.div`
	.page-item.active .page-link{
		z-index: 3;
	    color: #fff;
	    background-color: #d30000;
	    border-color: #d30000;
	}
	.page-link{
		color: #d30000;
	}
`;

export const LocateButton = styled.div`
	display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;