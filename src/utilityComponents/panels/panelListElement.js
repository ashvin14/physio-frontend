import React, { Component } from "react";
import { Panel, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class TableListElement extends Component {
  render() {
    let { patient, index } = this.props;
    console.log(patient);
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
        <td>{patient.diagnosed.length !== 1  ? patient.diagnosed.map((value, index) => value + " ,") : patient.diagnosed}</td>      
      </tr>
    );
  }
}
