import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

// delete this two lines
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

class App extends Component {
  state = { show: false };

  showSignUp = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  showSignUpComponent = () => (
    <Modal show={this.state.show} onHide={this.handleClose}>
      <Container type="Add Patient" md={12} sm={12}>
        <SignUpComponent roles="patient" handleClose={this.handleClose} />
      </Container>
    </Modal>
  );
  componentDidMount() {
    const { userStore } = this.props;
  }

  render() {
    let { userStore, history } = this.props;
    return (
      <div className="App">
        <section>
          <Header history={history} showSignUp={this.showSignUp} />
          {this.showSignUpComponent()}
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
              render={() => (
                <DoctorAuth>
                  <PatientAnalytics />
                </DoctorAuth>
              )}
            />
            <Route render={() => <h1>404 not found</h1>} />
          </Switch>
        </section>
      </div>
    );
  }
}

const newLocal = inject("patientStore", "userStore");
export default newLocal(withRouter(observer(App)));
