import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import UtilityMethods from "../UtilityMethods";
import { FailedSignIn } from "./ActionMessages";

class Login extends Component {
  state = { loading: false };
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      authenticated: false,
      roles: null,
    };
  }

  loginSuccess = user => {
    let { roles } = user;

    UtilityMethods.setUserSession(user, {
      authenticated: true,
      authenticating: false,
    });
    this.setState({
      authenticated: true,
      roles,
      loading: false,
    });
  };

  onSubmitLogin = ev => {
    let { userStore } = this.props;
    ev.preventDefault();
    this.setState({ loading: true });

    if (ev.target.userid.value && ev.target.pass.value) {
      let userAuthData = {
        username: ev.target.userid.value,
        password: ev.target.pass.value,
      };
      userStore.authenticate(
        userAuthData,
        response => this.loginSuccess(response.data),
        err => this.loginError(err),
      );
    }
  };

  loginError = error => {
    let { errorStore } = this.props;
  };

  render() {
    let { title, userStore } = this.props;
    let { roles, authenticated } = this.state;

    if (authenticated && userStore.isDoctor)
      return <Redirect to={`${roles}/`} />;

    return (
      <Form onSubmit={this.onSubmitLogin}>
        <FieldGroup type="text" placeholder="Username" name="userid" />
        <FieldGroup type="password" placeholder="Password" name="pass" />
        <FormGroup>
          <ButtonComponent
            type={this.state.loading ? "sending ..." : "Log in"}
            signupPatient={this.signup}
            {...this.props}
          />
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore", "errorStore")(withRouter(observer(Login)));
