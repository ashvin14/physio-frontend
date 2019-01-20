import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { FailedSignIn } from "./ActionMessages";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
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

  loginError = () => this.setState({ error: true });

  signup = ev => this.setState({ signupLink: true });

  render() {
    let { title, userStore } = this.props;
    let { roles, authenticated, signupLink } = this.state;

    if (authenticated && roles) return <Redirect to={`${roles}/`} />;

    if (signupLink) return <Redirect to="patient/signup" />;

    if (this.state.error)
      return (
        <FailedSignIn
          errors={this.state.error}
          message={"username or password doesnt match"}
          title={"Authentication Failed"}
        />
      );
    console.log(this.state.error);

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
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore")(withRouter(observer(Login)));
