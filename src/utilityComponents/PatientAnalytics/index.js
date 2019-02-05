import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import MaxScoreGraph from "./graphs";
import { withRouter } from "react-router-dom";
import NotificationsComponent from "./Notifications";
import RomGraph from "./graphs/RomGraph";

class PatientAnalytics extends Component {
  state = { key: 1, maxScoreData: [] };

  maxScoreData = maxScoreData => this.setState({ maxScoreData });

  componentDidMount() {
    let { patientStore, match } = this.props;
    patientStore.setCurrentPatient(match.params.patientId, patient => {
      patientStore.currentPatientMaxScoreDayWise(
        patientStore.getCurrentPatient.user_id,
        patientStore.getCurrentPatient.diagnosed[0],
        values => this.maxScoreData(values),
      );
    });
  }

  handleSelect = key => this.setState({ key });

  render() {
    let { patientStore, match } = this.props;
    let { key, maxScoreData } = this.state;
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Max Score Analysis">
          <Row>
            <Col md={6} xs={12} sm={5}>
              <MaxScoreGraph data={maxScoreData} />
            </Col>
            <Col md={6} xs={12}>
              <NotificationsComponent
                eventKey={this.state.key}
                data={maxScoreData}
              />
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

export default withRouter(inject("patientStore")(observer(PatientAnalytics)));
