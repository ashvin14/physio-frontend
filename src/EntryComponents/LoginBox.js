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
      roles: null,
      singupLink: false,
    };
  }

  loginSuccess = roles => {
    this.setState({
      authenticated: true,
      roles,
    });
  };

  onSubmitLogin = ev => {
    let { userStore } = this.props;
    ev.preventDefault();

    if (ev.target.userid.value && ev.target.pass.value) {
      let userAuthData = {
        username: ev.target.userid.value,
        password: ev.target.pass.value,
      };
      userStore.authenticate(
        userAuthData,
        response => this.loginSuccess(response.data.roles),
        err => this.loginError(err),
      );
    }
  };

  loginError = () => {
    this.setState({
      Error: "* password or username is incorrect",
    });
  };

  singUp = ev => this.setState({ signupLink: true });

  render() {
    let { title, userStore } = this.props;
    let { roles, authenticated, signupLink } = this.state;
    console.log(this.props);

    if (authenticated && roles) return <Redirect to={`${roles}/account`} />;

    if (signupLink) return <Redirect to="patient/signup" />;

    return (
      <Form onSubmit={this.onSubmitLogin}>
        <FieldGroup type="Unique id" placeholder="Patient Id" name="userid" />
        <FieldGroup type="password" placeholder="password" name="pass" />
        <FormGroup>
          <ButtonComponent
            type="Log In"
            signupPatient={this.signup}
            {...this.props}
          />
          {this.state.Error}
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore")(withRouter(observer(Login)));
