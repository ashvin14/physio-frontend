import React, { Component } from "react";
import PanelComponent from "./panelGroup";
import TableListElement from "./panelListElement";

export default class PatientsList extends Component {
  render() {
    return <PanelComponent />;
  }
}

export { PanelComponent, TableListElement };
