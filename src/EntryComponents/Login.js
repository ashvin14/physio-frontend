import React, { Component } from "react";
import Container, { LoginBox } from "./";

class Login extends Component {
  render() {
    return (
      <Container {...this.props}>
        <LoginBox role={this.props.role} />
      </Container>
    );
  }
}

export default Login;
