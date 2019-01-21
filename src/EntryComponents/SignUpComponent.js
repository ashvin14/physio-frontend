import React, { Component } from "react";
import FormContainer from "./formContainer";
import { Redirect, withRouter } from "react-router-dom";
import { FieldGroup, ButtonComponent } from "./Fields";
import { Form, FormGroup, Radio, Checkbox, FormControl } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";

class SignUpComponent extends Component {
  constructor() {
    super();
    this.state = {
      Error: null,
      authenticated: false,
      diag: [
        {id: 1, value: "Elbow", isChecked: false},
        {id: 2, value: "Wrist", isChecked: false},
      ]
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
        fullname: ev.target.fullname.value,
        username: ev.target.userid.value,
        password: ev.target.pass.value,        
        age: ev.target.age.value,
        mobile: ev.target.mobile.value,
        gender: ev.target.gender.value,
        diagnosed: ev.target.diagnosed.value
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
        <FieldGroup type="text" placeholder="Patient's Name" name="fullname" />
        <FieldGroup type="text" placeholder="Username" name="userid" />
        <FieldGroup type="password" placeholder="Password" name="pass" />
        <FieldGroup type="number" placeholder="Age" name="age" />
        <FieldGroup type="number" placeholder="Mobile No." name="mobile" />
        <FormGroup>
          <strong>GENDER</strong>
          <Radio name="gender" value="Male">
            Male
          </Radio>{' '}
          <Radio name="gender" value="Female">
            Female
          </Radio>
       </FormGroup>
        <FormGroup>
          <strong>DIAGNOSED</strong>
          <Checkbox
            name="diagnosed"
            value="Elbow">
            Elbow
          </Checkbox>
          <Checkbox
            name="diagnosed"
            value="Wrist">
            Wrist
          </Checkbox>
        </FormGroup>
        <FormGroup>
          <ButtonComponent type="SignUp" />
          {this.state.Error}
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore")(withRouter(observer(SignUpComponent)));
