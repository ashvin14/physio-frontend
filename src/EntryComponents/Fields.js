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
function ButtonComponent({ type, signupPatient, ...props }) {
  return (
    <Col>
      <ButtonToolbar>
        <Button bsStyle="primary" type="submit">
          {type}
        </Button>
        {props.location && props.location.pathname === "/login" ? (
          <Button>Sign Up</Button>
        ) : null}
      </ButtonToolbar>
    </Col>
  );
}

export { FieldGroup, ButtonComponent };
