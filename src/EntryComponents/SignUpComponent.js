import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";

class signUpComponent extends Component {
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

  onSubmitSignup = ev => {
    let { userStore, roles } = this.props;
    ev.preventDefault();

    if (ev.target.userid.value && ev.target.pass.value) {
      let userAuthData = {
        username: ev.target.userid.value,
        password: ev.target.pass.value,
        patientName: ev.target.patientName.value,
        Age: ev.target.age.value,
        roles,
      };
      userStore.signUp(
        userAuthData,
        data => this.loginSuccess(),
        err => this.loginError(err),
      );
    }
  };

  loginError = () => {
    this.setState({
      Error: "* data cannot be saved",
    });
  };

  render() {
    let { title, userStore, role } = this.props;
    if (this.state.authenticated) return <Redirect push to="/" />;

    return (
      <Form onSubmit={this.onSubmitSignup}>
        <FieldGroup type="Unique id" placeholder="username" name="userid" />
        <FieldGroup type="password" placeholder="password" name="pass" />
        <FieldGroup
          type="patientName"
          placeholder="patient's Name"
          name="patientName"
        />
        <FieldGroup type="Number" placeholder="Age" name="age" />

        <FormGroup>
          <ButtonComponent type="sign up" />
          {this.state.Error}
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore")(withRouter(observer(signUpComponent)));
