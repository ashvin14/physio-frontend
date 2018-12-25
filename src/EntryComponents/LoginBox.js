import React, { Component } from "react";
import FormContainer from "./formContainer";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, FormControl } from "react-bootstrap";

export default class Login extends Component {
  render() {
    let { title } = this.props;
    return (
      <Form onSubmit={this.onSubmitLogin}>
        <FieldGroup type="Unique id" placeholder="Patient Id" name="id" />
        <FieldGroup type="password" placeholder="password" name="pass" />
        <FormGroup>
          <ButtonComponent type="login" onClick={this.onPatientRedirect} />
        </FormGroup>
      </Form>
    );
  }
}
