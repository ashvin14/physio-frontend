import React, { Component } from "react";
import { Table, Row, Col, Grid } from "react-bootstrap";
import { TableListElement } from "./";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

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
    let message = "";
    if (!allPatients.length)
      message = "no patients list available. Click add patient In action";
    return (
      <Grid>
        <Row>
          <Col md={9} sm={12}>
            <h4>{message}</h4>
            <Table responsive hover stripped>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Full Name</td>
                  <td>User Name</td>
                  <td>Age</td>
                  <td>Gender</td>
                  <td>Mobile</td>
                  <td>Diagnosed</td>
                </tr>
              </thead>
              <tbody>
                {allPatients.map((patient, index) => (
                  <TableListElement
                    index={index}
                    key={index}
                    patient={patient}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default inject("patientStore", "userStore")(observer(PanelComponent));
