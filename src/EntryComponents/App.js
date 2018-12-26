import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

// delete this two lines
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";

// add state management library
import Header from "../components/header";
import SignUpComponent from "./SignUpComponent";
import Container, { Login } from "./";

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
            <Route
              exact
              path="/"
              render={() => <Redirect to="patient/login" />}
            />
            <Route
              exact
              path="/patient/login"
              render={() => (
                <Login type="login" role="patient" md={5} sm={12} mdPush={3} />
              )}
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
                    <SignUpComponent role="patient" />
                  </Container>
                );
              }}
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
