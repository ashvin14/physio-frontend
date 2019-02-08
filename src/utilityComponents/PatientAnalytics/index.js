import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import MaxScoreGraph from "./graphs";
import { withRouter } from "react-router-dom";
import NotificationsComponent from "./Notifications";
import RomGraph from "./graphs/RomGraph";

class PatientAnalytics extends Component {
  state = {
    key: 1,
    MaxWristData: [],
    MaxElbowData: [],
    ElbowRomData: [],
    WristRomData: [],
  };

  componentDidMount() {
    let { patientStore, match } = this.props;

    patientStore.setCurrentPatient(match.params.patientId, patient => {
      patientStore.getCurrentPatient.diagnosed.map(joint => {
        patientStore.currentPatientMaxScoreDayWise(
          patientStore.getCurrentPatient.user_id,
          joint,

          values => {
            if (joint === "Elbow") this.setState({ MaxElbowData: values });
            else this.setState({ MaxWristData: values });
          },

          patientStore.currentPatientMinMaxRom(
            patientStore.getCurrentPatient.user_id,
            joint,
            values => {
              if (joint === "Elbow") this.setState({ ElbowRomData: values });
              else this.setState({ WristRomData: values });
            },
          ),
        );
      });
    });
  }

  handleSelect = key => this.setState({ key });

  render() {
    let { patientStore, match } = this.props;
    let {
      key,
      MaxElbowData,
      MaxWristData,
      ElbowRomData,
      WristRomData,
    } = this.state;
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Max Score Analysis">
          <Row>
            <Col md={6} xs={12} sm={5}>
              <MaxScoreGraph
                data={[...MaxElbowData, ...MaxWristData]}
                joint={
                  patientStore.getCurrentPatient
                    ? patientStore.currentPatient.diagnosed
                    : []
                }
              />
            </Col>
            <Col md={6} xs={12}>
              <NotificationsComponent
                eventKey={this.state.key}
                data={[...MaxElbowData, ...MaxWristData]}
              />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey={2} title="ROM analysis">
          <Row>
            <Col md={6} xs={12} sm={5}>
              <RomGraph
                data={[...ElbowRomData, ...WristRomData]}
                joint={
                  patientStore.getCurrentPatient
                    ? patientStore.getCurrentPatient.diagnosed
                    : []
                }
              />
            </Col>
            <Col md={6} xs={12}>
              <NotificationsComponent
                eventKey={this.state.key}
                data={[...ElbowRomData, ...WristRomData]}
              />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    );
  }
}

export default withRouter(inject("patientStore")(observer(PatientAnalytics)));
