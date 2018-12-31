import React, { Component } from "react";
import Container, { LoginBox } from "./";

class Login extends Component {
  render() {
    return (
      <Container {...this.props}>
        <LoginBox />
      </Container>
    );
  }
}

export default Login;
