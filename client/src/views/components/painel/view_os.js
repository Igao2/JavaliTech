import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import String from '../../../assets/values/string.json'

import { Card, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import { FotoCentoOitenta, ParagrafLeftGeral } from '../../../assets/values/styles';

export default class ViewOS extends Component {
    render() {
        return (
            <Card body>
                <Row md="2" sm="2" xs="1" >
                    <Col size="200px">
                        <CardTitle tag="h3">
                            {String.service_title} #{this.props.service_order_id}
                        </CardTitle>
                        <FotoCentoOitenta src={this.props.user_photo}/>
                    </Col>
                    <Col>
                        <ParagrafLeftGeral>
                            <div className="statusItem">
                                {String.status}: {this.props.status}<br />
                            </div>
                            <div className="dataItem">
                                {String.delivery_date}: {this.props.delivery_date}<br />
                                {String.completion_date}: {this.props.completion_date}
                            </div>
                            <CardText>
                                {String.description}: {this.props.description}<br />
                                {/* {String.device_photos}: {this.props.device_photos}<br/> */}
                                {/* {String.owner_name}: {this.props.owner_name}<br /> */}
                                {/* {String.service_value}: {this.props.service_value}<br /> */}
                                {/* {String.user_name}: {this.props.user_name} */}
                            </CardText>
                        </ParagrafLeftGeral>
                    </Col>
                </Row>

                <Button>
                    {String.service_view}
                </Button>
            </Card>
        )
    }
}
