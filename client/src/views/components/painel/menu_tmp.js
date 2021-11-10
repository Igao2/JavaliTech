import React from 'react';
import { CenterHeaderOn, ContainerHeaderOn, RightHeaderOn, HeaderIcon }
    from '../../../assets/values/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Row, Col
} from 'reactstrap';

class PainelUser_menuMob extends React.Component {
    render() {
        return (
            <div>
                <Row xs="4">
                    <Col className="bg-light">
                        Column
                    </Col>
                    <Col className="bg-light">
                        Column
                    </Col>
                    <Col className="bg-light">
                        Column
                    </Col>
                    <Col className="bg-light">
                        Column
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PainelUser_menuMob;