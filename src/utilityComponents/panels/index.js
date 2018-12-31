import React, { Component } from "react";
import PanelComponent from "./panelGroup";
import PanelListElement from "./panelListElement";

export default class PatientsList extends Component {
  render() {
    return <PanelComponent />;
  }
}

export { PanelComponent, PanelListElement };
