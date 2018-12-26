import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      Error: null,
      authenticated: false,
    };
  }

  loginSuccess = () => {
    this.setState({
      authenticated: true,
    });
    console.log(this.state);
  };

  onSubmitLogin = ev => {
    let { userStore, role } = this.props;
    ev.preventDefault();

    if (ev.target.userid.value && ev.target.pass.value) {
      let userAuthData = {
        username: ev.target.userid.value,
        password: ev.target.pass.value,
        role,
      };
      userStore.authenticate(
        userAuthData,
        data => this.loginSuccess(),
        err => this.loginError(err),
      );
    }
  };

  loginError = () => {
    this.setState({
      Error: "* password or username is incorrect",
    });
  };

  render() {
    let { title, userStore, role } = this.props;
    if (this.state.authenticated)
      return <Redirect push to="/patient/account" />;

    return (
      <Form onSubmit={this.onSubmitLogin}>
        <FieldGroup type="Unique id" placeholder="Patient Id" name="userid" />
        <FieldGroup type="password" placeholder="password" name="pass" />
        <FormGroup>
          <ButtonComponent type="login" />
          {this.state.Error}
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore")(withRouter(observer(Login)));