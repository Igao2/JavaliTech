import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Row, Container } from 'reactstrap';
import { ItemColAvatar, AlertDelet } from '../../../assets/values/styles';

import { NavLink } from "react-router-dom";

export default class InfoAlert extends Component {
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
