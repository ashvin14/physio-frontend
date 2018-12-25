import React, { Component } from "react";
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
} from "react-bootstrap";

function FieldGroup({ ...props }) {
  return (
    <FormGroup>
      <Col>
        <FormControl {...props} />
      </Col>
    </FormGroup>
  );
}
function ButtonComponent({ type, ...props }) {
  return (
    <Col>
      <ButtonToolbar>
        <Button bsStyle="primary" type="Submit">
          login
        </Button>
      </ButtonToolbar>
    </Col>
  );
}

export { FieldGroup, ButtonComponent };
