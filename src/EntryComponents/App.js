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

class App extends Component {
  componentDidMount() {
    const { userStore } = this.props;
  }

  render() {
    let { userStore, history } = this.props;
    return (
      <div className="App">
        <section>
          <Header history={history} />

          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/login"
              render={() => <Login type="login" md={5} sm={12} mdPush={3} />}
            />

            <Route
              path="/patient/signup"
              render={() => {
                return (
                  <Container
                    type="signup"
                    role="patient"
                    md={5}
                    sm={12}
                    mdPush={3}
                  >
                    <SignUpComponent roles="patient" />
                  </Container>
                );
              }}
            />
            <Route
              path="/doctor/account"
              render={() => (
                <DoctorAuth>
                  <PatientsList />
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
