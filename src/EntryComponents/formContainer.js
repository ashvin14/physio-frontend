import React, { Component } from "react";
import {
  Panel,
  Col,
  Form,
  Row,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
} from "react-bootstrap";

export default class FormContainer extends Component {
  render() {
    let { children, role, type } = this.props;

    return (
      <Row>
        <Col {...this.props}>
          <Panel>
            <Panel.Heading>
              {role} {type}
            </Panel.Heading>
            <Panel.Body>{children}</Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}
