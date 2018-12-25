import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Container, { Login } from "./EntryComponents/";

// add state management library
import Header from "../src/components/header";
class App extends Component {
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

export default App;
