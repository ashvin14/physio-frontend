import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { FailedSignIn } from "./ActionMessages";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
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

  loginError = error => {
    this.props.toggleErrorState({
      title: "Something went wrong :/",
      message: error.response.data,
    });
  };

  signup = ev => this.setState({ signupLink: true });

  render() {
    let { title, userStore } = this.props;
    let { roles, authenticated, signupLink } = this.state;

    if (authenticated && roles) return <Redirect to={`${roles}/`} />;

    if (signupLink) return <Redirect to="patient/signup" />;

    return (
      <Form onSubmit={this.onSubmitLogin}>
        <FieldGroup type="text" placeholder="Username" name="userid" />
        <FieldGroup type="password" placeholder="Password" name="pass" />
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
