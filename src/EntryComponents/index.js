import React, { Component } from "react";
import { Row, Col, Card } from "react-materialize";
import FormContainer from "./formContainer";
import Login from "./LoginBox";
import { FieldGroup, ButtonComponent } from "./Fields";

export default class Container extends Component {
  render() {
    let { children } = this.props;

    return <FormContainer {...this.props}>{children}</FormContainer>;
  }
}

export { FormContainer, Login, FieldGroup, ButtonComponent };
