/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import String from '../../../assets/values/string.json';

import { ItemColAvatar, ItemColText, ItemDiv, ItemMsgUser, ProfilePhoto } from '../../../assets/values/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row, Container } from 'reactstrap';
import TableListaOS from "./table_list_os";
import avatarBackground from '../../../assets/images/icons/backgroundAvatar.png';

/**
 * @class
 * @description Componente que gera uma tela de bem vindo ao usuario
 */
class ItemUser extends React.Component {
    render() {
        /** const que armazena o número de linhas que a tabela vai ter. */
        const breakOfPages = 3;

        /** const que armazena o tipo de filtro que irá ser usado para selecionar as OS's presentes na tabela. */
        const filterType = 1;

        /** const que armazena um array com as colinas presentes na tabela. */
        const tableColumn = ["service_order_id", "owner_name", "device_name", "delivery_date", "status", "service_value"];

        return (
            <Container>
                <Row>
                    <Col size="20px">
                        <ItemMsgUser>
                            {String.menuUserWellcome}<b>{this.props.userInfos.name}</b>
                        </ItemMsgUser>
                    </Col>
                </Row>
                <ItemDiv />
                <Row md="2" sm="2" xs="1" >
                    <Col size="200px">
                        <ItemColAvatar>
                            <ProfilePhoto imgUrl={avatarBackground}>

                                <img
                                    src={this.props.userInfos.photo[0]}
                                    alt="Imagem"
                                    style={{
                                        left: this.props.userInfos.photo[1].left + "px",
                                        top: this.props.userInfos.photo[1].top + "px",
                                        width: this.props.userInfos.photo[1].width + "%"
                                    }}
                                />

                            </ProfilePhoto>
                        </ItemColAvatar>
                    </Col>
                    <Col>
                        <ItemColText>
                            <p>
                                {String.itemInfo01} {this.props.userInfos.name}
                                <br />
                                {String.itemInfo02} {this.props.userInfos.address.rua}, {this.props.userInfos.address.bairro}, {this.props.userInfos.address.cidade}, {this.props.userInfos.address.estado}
                                <br />
                                {String.itemInfo03} {this.props.userInfos.telephone}

                            </p>
                        </ItemColText>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ItemMsgUser>
                            {String.itemCalendar}
                        </ItemMsgUser>

                        <ItemDiv />
                        <TableListaOS {...({ breakOfPages, filterType, tableColumn })} />
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default ItemUser;