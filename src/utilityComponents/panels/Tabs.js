import React, { Component } from "react";
import { Tabs, Tab, Row } from "react-bootstrap";

class TabComponent extends Component {
  state = { key: 1 };

  handleChange = key => {
    this.setState({ key });
  };

  render() {
    return (
      <Tabs
        defaultActiveKey={1}
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={this.handleChange}
      >
        <Tab eventKey={"1"} title={"Graph"}>
          <h1>Graph</h1>
        </Tab>
        <Tab eventKey={"2"} title={"problems"}>
          <h1>problems</h1>
        </Tab>
        <Tab eventKey={"3"} title={"Add data and Problems"}>
          <Row />
        </Tab>
      </Tabs>
    );
  }
}

export default TabComponent;
