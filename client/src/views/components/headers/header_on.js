/* eslint-disable react/jsx-pascal-case */
// eslint-disable-next-line
import React from 'react';
import String from '../../../assets/values/string.json';

import { ContainerHeaderOn, ContainerHeaderOn_MobMenu, ContainerHeaderOn_PcMenu, ItemIcoMenu }
	from '../../../assets/values/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import calendar_plus_solid   from '../../../assets/images/fontwesome/calendar_plus_solid.svg';
import list_alt_solid   from '../../../assets/images/fontwesome/list_alt_solid.svg';
import search_solid   from '../../../assets/images/fontwesome/search_solid.svg';
import sign_out_alt_solid   from '../../../assets/images/fontwesome/sign_out_alt_solid.svg';
import user_edit_solid   from '../../../assets/images/fontwesome/user_edit_solid.svg';
import user_solid   from '../../../assets/images/fontwesome/user_solid.svg';

class HeaderContainerOn extends React.Component {
	render() {
		return (
			<ContainerHeaderOn>

				{/* Visão em PC */}
				<ContainerHeaderOn_PcMenu />
				<ContainerHeaderOn_PcMenu>
				<i class="fas fa-sign-in-alt"></i>
					{String.menuUserWellcome}<b>{String.menuUser}</b>
				</ContainerHeaderOn_PcMenu>

				{/* Visão em Mobiles */}
				<ContainerHeaderOn_MobMenu
					href="#1"
					alt={String.menuEditUser}
					title={String.menuEditUser}>
					<ItemIcoMenu src={user_edit_solid}/>
				</ContainerHeaderOn_MobMenu>
				<ContainerHeaderOn_MobMenu
					href="#2"
					alt={String.menuAddOS}
					title={String.menuAddOS}>
					<ItemIcoMenu src={calendar_plus_solid}/>
				</ContainerHeaderOn_MobMenu>
				<ContainerHeaderOn_MobMenu
					href="#3"
					alt={String.menuListOS}
					title={String.menuListOS}>
					<ItemIcoMenu src={list_alt_solid}/>
				</ContainerHeaderOn_MobMenu>
				<ContainerHeaderOn_MobMenu
					href="#4"
					alt={String.munuSearchOS}
					title={String.munuSearchOS} >
					<ItemIcoMenu src={search_solid}/>
				</ContainerHeaderOn_MobMenu>

				<ContainerHeaderOn_MobMenu
					href="#5"
					alt={String.menuExit}
					title={String.menuExit} >
					<ItemIcoMenu src={sign_out_alt_solid}/>
				</ContainerHeaderOn_MobMenu>

				{/* <PainelUser_menuMob/> */}
				{/* <CenterHeaderOn></CenterHeaderOn>
				<RightHeaderOn>
					<Button block color="dark" onClick={function noRefCheck(){}} >{String.menu}</Button>
					<Button block color="dark" >{String.search}</Button>
					</RightHeaderOn> */}
			</ContainerHeaderOn>
		)
	}
}

export default HeaderContainerOn;