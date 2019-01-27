import React from "react";
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
function ButtonComponent({ type, signupPatient, bsStyle, ...props }) {
  return (
    <Col>
      <ButtonToolbar>
        <Button bsStyle={bsStyle || "primary"} type="submit" {...props}>
          {type}
        </Button>
      </ButtonToolbar>
    </Col>
  );
}

export { FieldGroup, ButtonComponent };
