import React, { Component } from "react";
import Container, { LoginBox } from "./";
import { Redirect, withRouter } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <Container {...this.props}>
        <LoginBox role={this.props.role} />
      </Container>
    );
  }
}

export default withRouter(Login);
