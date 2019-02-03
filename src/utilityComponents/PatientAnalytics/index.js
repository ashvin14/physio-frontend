import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import MaxScoreGraph from "./graphs";
import { withRouter } from "react-router-dom";
import NotificationsComponent from "./Notifications";
import RomGraph from "./graphs/RomGraph";

class PatientAnalytics extends Component {
  state = { key: 1, maxScoreData: null };

  maxScoreData = values => this.setState({ maxScoreData: values });

  componentWillMount() {
    let { patientStore, match } = this.props;
    patientStore.setCurrentPatient(match.params.patientId);
  }

  componentDidMount() {
    let { patientStore } = this.props;
    if (patientStore.getCurrentPatient) {
      patientStore.currentPatientMaxScoreDayWise(
        patientStore.getCurrentPatient.user_id,
        patientStore.getCurrentPatient.diagnosed[0],
        values => this.maxScoreData(values),
      );
    }
  }

  handleSelect = key => this.setState({ key });

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Max Score Analysis">
          <Row>
            <Col md={6} xs={12} sm={5}>
              <MaxScoreGraph data={this.state.maxScoreData} />
            </Col>
            <Col md={6} xs={12}>
              <NotificationsComponent />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey={2} title="ROM analysis">
          <RomGraph />
        </Tab>
      </Tabs>
    );
  }
}

export default withRouter(
  inject("userStore", "patientStore")(observer(PatientAnalytics)),
);
