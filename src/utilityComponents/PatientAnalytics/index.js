import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Tabs, Tab } from "react-bootstrap";

class PatientAnalytics extends Component {
  state = { key: 1 };

  handleSelect = key => this.setState({ key });
  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Tab 1" />
        <Tab eventKey={2} title="Tab 2" />
        <Tab eventKey={3} title="Tab 3" />
      </Tabs>
    );
  }
}

export default inject("userStore")(observer(PatientAnalytics));
