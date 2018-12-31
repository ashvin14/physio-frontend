import React, { Component } from "react";
import { Panel } from "react-bootstrap";

export default class panelListItem extends Component {
  render() {
    let { eventKey, name, children } = this.props;
    console.log("eventKey:" + eventKey);
    return (
      <Panel eventKey={eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>{name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>{children}</Panel.Body>
      </Panel>
    );
  }
}
