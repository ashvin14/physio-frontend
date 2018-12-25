import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Container, { Login } from "./EntryComponents/";
import { extendObservable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";

// add state management library
import Header from "../src/components/header";
class App extends Component {
  Error = err => {
    console.log(err);
  };
  componentDidMount() {
    const { patientStore } = this.props;
    patientStore.grabAllPatients();
    console.log(patientStore.allPatients);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Container type="login" role="patient" md={5} sm={12} mdPush={3}>
          <Login />
        </Container>
      </div>
    );
  }
}

export default inject("patientStore")(observer(App));
