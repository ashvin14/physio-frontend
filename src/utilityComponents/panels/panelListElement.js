import React, { Component } from "react";
import { Panel, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { inject } from "mobx-react";
import { ButtonComponent } from "../../EntryComponents";

class TableListElement extends Component {
  render() {
    let { patient, index, patientStore, userStore } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>

        <td>
          <NavLink to={`./patient/${patient.user_id}`}>
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
          <ButtonComponent
            type="Edit"
            bsStyle="warning"
            onClick={() => {
              userStore.toggleEdited(true);
              userStore.setEditUserId(patient.user_id);
            }}
          />
        </td>
        <td>
          <ButtonComponent
            type="Delete"
            bsStyle="danger"
            onClick={() => userStore.deleteCurrentPatient(patient.user_id)}
          />
        </td>
      </tr>
    );
  }
}

export default inject("patientStore", "userStore")(TableListElement);
