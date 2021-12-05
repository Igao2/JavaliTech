import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import String from '../../../assets/values/string.json'

import { Card, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import { ParagrafLeftGeral, ProfilePhoto } from '../../../assets/values/styles';

import avatarBackground from '../../../assets/images/icons/backgroundAvatar.png';

/**
 * @class
 * @description Componente que gera uma campo de visualização para as informações básicas da OS, junto a um botão para habilitar o input de senha da OS
 */
class ViewOS extends Component {

    /** método que limita o número de letras presentes na descrição da OS */
    descriptionLimit(description) {
        let newDescription = description.split(0, 50);
        return ({ newDescription });
    }

    render() {
        return (
            <Card body>
                <Row md="2" sm="2" xs="1" >
                    <Col size="200px">
                        <CardTitle tag="h3">
                            {String.service_title} #{this.props.service_order_id}
                        </CardTitle>
                        <ProfilePhoto imgUrl={avatarBackground}>
                            <img
                                src={this.props.user_photo[0]}
                                alt="Imagem"
                                style={{
                                    left: this.props.user_photo[1].left + "px",
                                    top: this.props.user_photo[1].top + "px",
                                    width: this.props.user_photo[1].width + "%"
                                }}
                            />
                        </ProfilePhoto>
                    </Col>
                    <Col>
                        <ParagrafLeftGeral>
                            <div className="statusItem">
                                {String.user_name}: {this.props.user_name}<br />
                                {String.owner_name}: {this.props.owner_name}<br />
                                {String.status}: {String.statusType[this.props.status]}<br />
                            </div><hr />

                            <div className="dataItem">
                                {String.delivery_date}: {this.props.delivery_date ? this.props.delivery_date.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}<br />
                                {String.completion_date}: {this.props.completion_date ? this.props.completion_date.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}
                            </div><hr />

                            <CardText>
                                {String.description}:
                                {this.props.description.length > 100 && " " + this.props.description.slice(0, 100) + "..."}
                                {this.props.description.length <= 100 && " " + this.props.description.slice(0, 100)}
                            </CardText>
                        </ParagrafLeftGeral>
                    </Col>
                </Row>

                {this.props.service_order_id !== "" &&
                    <Button onClick={e => this.props.enableValidaPassword()}>
                        {String.service_view}
                    </Button>
                }
            </Card>
        )
    }
}

export default ViewOS;