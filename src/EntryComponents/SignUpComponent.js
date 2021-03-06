import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, Radio, Checkbox, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import UtitlityMethods from "../UtilityMethods";

import Picky from "react-picky";
import "react-picky/dist/picky.css";

class SignUpComponent extends Component {
  constructor() {
    super();
    this.state = {
      diagnosed: [],
      gender: "Male",
      loading: false,
    };
  }

  signupSuccess = data => {
    this.setState({
      authenticated: true,
      loading: false,
    });
    this.props.patientStore.pushPatient(data);
    this.props.handleClose();
  };

  onSubmitSignup = ev => {
    let { userStore, roles, errorStore } = this.props;
    ev.preventDefault();
    this.setState({ loading: true });

    if (ev.target.userid.value && ev.target.pass.value) {
      let userAuthData = {
        fullname: ev.target.fullname.value,
        username: ev.target.userid.value,
        password: ev.target.pass.value,
        age: ev.target.age.value,
        mobile: ev.target.mobile.value || null,
        email: ev.target.email.value,
        gender: this.state.gender,
        diagnosed: this.state.diagnosed,
        roles: this.props.roles,
      };

      userStore.signUp(
        userAuthData,
        response => this.signupSuccess(response.data),
        err => this.signupError(err),
      );
    }
  };

  signupError = error => {
    this.setState({ loading: false });
    this.props.toggleErrorState({
      title: "data Cannot be saved",
      message: error.response.data,
    });
  };

  onCheckBoxChange = selected => {
    this.setState(prevState => ({
      diagnosed: selected,
    }));
  };

  onChangeGender = value =>
    this.setState({
      gender: value,
    });

  render() {
    let { title, userStore, role } = this.props;
    const options = ["Wrist", "Elbow"];

    return (
      <Form onSubmit={this.onSubmitSignup}>
        <FieldGroup type="text" placeholder="Patient's Name" name="fullname" />
        <FieldGroup type="text" placeholder="Username" name="userid" />
        <FieldGroup type="text" placeholder="Email Id" name="email" />
        <FieldGroup type="password" placeholder="Password" name="pass" />
        <FieldGroup type="number" placeholder="Age" name="age" />
        <FieldGroup type="number" placeholder="Mobile No." name="mobile" />
        <FormGroup>
          <strong>GENDER</strong>

          <Picky
            options={["Male", "Female"]}
            onChange={this.onChangeGender}
            value={this.state.gender}
          />
        </FormGroup>
        <FormGroup>
          <strong>diagnosed</strong>

          <Picky
            options={options}
            onChange={this.onCheckBoxChange}
            value={this.state.diagnosed}
            multiple
          />
        </FormGroup>
        <FormGroup>
          <ButtonComponent
            type={this.state.loading ? "adding patient..." : "Add Patient"}
            block
            bsSize="large"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore", "patientStore", "errorStore")(
  withRouter(observer(SignUpComponent)),
);
