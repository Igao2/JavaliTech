import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Row, Container } from 'reactstrap';
import { ItemColAvatar, AlertDelet } from '../../../assets/values/styles';

import { NavLink } from "react-router-dom";

/**
 * @class
 * @description  Esta class organiza as informações do alert
 */
class InfoAlert extends Component {
    render() {
        return (
            <Container>
                <br />
                <ItemColAvatar>
                    <h1>{this.props.titleAlert}</h1>
                    <AlertDelet>
                        {this.props.describeAlert}
                    </AlertDelet>
                    <Row >
                        <br />
                        <NavLink to="/">
                            <Button block color="dark">
                                Ir para a home
                            </Button>
                        </NavLink>
                    </Row>
                </ItemColAvatar>
            </Container>
        )
    }
}

export default InfoAlert;
