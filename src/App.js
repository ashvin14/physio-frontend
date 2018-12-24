import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// add state management library
import Header from "../src/components/header";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
