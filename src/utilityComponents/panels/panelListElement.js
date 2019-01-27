import React, { Component } from "react";
import { Panel, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { inject } from "mobx-react";
import { ButtonComponent } from "../../EntryComponents";

class TableListElement extends Component {
  render() {
    let { patient, index, patientStore } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>

        <td>
          <NavLink
            onClick={() => patientStore.setCurrentPatient(patient)}
            to={`./patient/${patient.user_id}`}
          >
            {patient.fullname}
          </NavLink>
        </td>
        <td>{patient.username}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.mobile}</td>
        <td>
          {patient.diagnosed && patient.diagnosed.length !== 1
            ? patient.diagnosed.map((value, index) => value + ", ")
            : patient.diagnosed}
        </td>
        <td>
          <ButtonComponent type="Edit" bsStyle="warning" />
        </td>
        <td>
          <ButtonComponent type="Delete" bsStyle="danger" />
        </td>
      </tr>
    );
  }
}

export default inject("patientStore")(TableListElement);
