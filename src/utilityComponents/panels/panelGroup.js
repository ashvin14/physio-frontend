import React, { Component } from "react";
import { PanelGroup, Row, Col, Grid } from "react-bootstrap";
import { PanelListElement } from "./";
import { observer, inject } from "mobx-react";
import TabComponent from "./Tabs";

class PanelComponent extends Component {
  state = { activeKey: 0 };

  handleSelect = activeKey => {
    this.setState({ activeKey });
  };
  componentDidMount() {
    let { patientStore } = this.props;
    patientStore.grabAllPatients();
  }
  render() {
    let { patientStore } = this.props;
    let { allPatients } = patientStore;

    return (
      <Grid>
        <Row>
          <Col md={9} sm={12}>
            <PanelGroup
              accordion
              id="accordion-controlled-example"
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
            >
              {allPatients.map((patient, index) => (
                <PanelListElement
                  key={index}
                  name={patient.patientName}
                  eventKey={index + 1}
                >
                  <TabComponent />
                </PanelListElement>
              ))}
            </PanelGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default inject("patientStore", "userStore")(observer(PanelComponent));
