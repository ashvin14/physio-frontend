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

class EditComponent extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      password: "",
      username: "",
      mobile: 0,
      age: 0,
      gender: "",
      diagnosed: [],
      loading: false,
    };
  }

  componentDidMount() {
    let { userStore, patientStore } = this.props;
    patientStore.setCurrentPatient(
      userStore.editedUserId,
      ({
        fullname,
        username,
        password,
        age,
        diagnosed,
        mobile,
        email,
        gender,
      }) => {
        this.setState({
          fullname,
          username,
          password,
          age,
          mobile,
          diagnosed,
          gender,
          email,
        });
      },
    );
  }

  editSuccess = data => {
    this.setState({
      loading: false,
    });
    this.props.handleClose();
  };

  onEditSubmit = ev => {
    let { userStore, roles, errorStore, patientStore } = this.props;
    ev.preventDefault();
    this.setState({ loading: true });

    let {
      fullname,
      password,
      username,
      age,
      gender,
      diagnosed,
      email,
      mobile,
    } = this.state;

    let userEditedData = {
      fullname,
      password,
      username,
      age,
      gender,
      diagnosed,
      email,
      mobile,
    };

    userStore.editCurrentPatient(
      patientStore.getCurrentPatient.user_id,
      userEditedData,
      response => this.editSuccess(response.data),
    );
  };

  editError = error => {
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

  handleEditedChanges = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    let { title, userStore, role } = this.props;
    const options = ["Wrist", "Elbow"];

    return (
      <Form onSubmit={this.onEditSubmit}>
        <FieldGroup
          type="text"
          placeholder="Patient's Name"
          name="fullname"
          onChange={this.handleEditedChanges}
          value={this.state.fullname}
        />
        <FieldGroup
          type="text"
          placeholder="Username"
          name="username"
          onChange={this.handleEditedChanges}
          value={this.state.username}
        />
        <FieldGroup
          type="text"
          placeholder="Email Id"
          name="email"
          onChange={this.handleEditedChanges}
          value={this.state.email}
        />
        <FieldGroup
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleEditedChanges}
          value={this.state.password}
        />
        <FieldGroup
          type="text"
          placeholder="Age"
          name="age"
          onChange={this.handleEditedChanges}
          value={this.state.age}
        />

        <FieldGroup
          type="text"
          placeholder="Mobile No."
          name="mobile"
          onChange={this.handleEditedChanges}
          value={this.state.mobile}
        />
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
            type={this.state.loading ? "Editing..." : "Edit"}
            block
            bsSize="large"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default inject("userStore", "errorStore", "patientStore")(
  withRouter(observer(EditComponent)),
);
