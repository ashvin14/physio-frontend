import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

//import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";

// add state management library
import Header from "../components/header";
import { PatientsList } from "./loadRoutes";
import SignUpComponent from "./SignUpComponent";
import Container, { Login } from "./";
import DoctorAuth from "../utilityComponents/DoctorAuth";
import { Modal } from "react-bootstrap";
import PatientAnalytics from "../utilityComponents/PatientAnalytics";
import UtilityMethods from "../UtilityMethods";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import EditComponent from "./EditComponent";

class App extends Component {
  state = { signUp: false };

  showSignUp = () => this.setState({ signUp: true });
  handleClose = () => this.setState({ signUp: false });
  handleCloseEdit = () => this.props.userStore.toggleEdited(false);

  editBoxComponent = () => (
    <Modal show={this.props.userStore.edited} onHide={this.handleCloseEdit}>
      <Container type="Edit Patient" md={12} sm={12}>
        <EditComponent roles="patient" handleClose={this.handleCloseEdit} />
      </Container>
    </Modal>
  );

  showSignUpComponent = () => (
    <Modal show={this.state.signUp} onHide={this.handleClose}>
      <Container type="Add Patient" md={12} sm={12}>
        <SignUpComponent roles="patient" handleClose={this.handleClose} />
      </Container>
    </Modal>
  );

  clearError = () => this.props.errorStore.clearError();

  showErrorPopup = () => {
    let { errorStore } = this.props;
    if (errorStore.ErrorStatus)
      return NotificationManager.error(errorStore.ErrorMessage);
  };

  componentDidMount() {
    const { userStore } = this.props;

    if (UtilityMethods.hasUserSession())
      userStore.setUser(UtilityMethods.getUserSession().user);
  }

  render() {
    let { userStore, history } = this.props;
    return (
      <div className="App">
        <section>
          <Header history={history} showSignUp={this.showSignUp} />
          {this.showSignUpComponent()}
          {this.editBoxComponent()}
          {this.showErrorPopup()}

          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/login"
              render={() => <Login type="login" md={5} sm={12} mdPush={3} />}
            />
            />
            <Route
              exact
              path="/doctor"
              render={() => (
                <DoctorAuth>
                  <PatientsList />
                </DoctorAuth>
              )}
            />
            <Route
              exact
              path="/doctor/patient/:patientId"
              render={() => {
                return (
                  <DoctorAuth>
                    <PatientAnalytics />
                  </DoctorAuth>
                );
              }}
            />
            <Route render={() => <h1>404 not found</h1>} />
          </Switch>
          <NotificationContainer enterTimeOut={5000} leaveTimeOut={5000} />
        </section>
      </div>
    );
  }
}

const newLocal = inject("userStore", "errorStore", "patientStore");
export default newLocal(withRouter(observer(App)));
