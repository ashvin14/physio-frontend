import React, { Component } from "react";
import { MenuItem } from "react-bootstrap";

function HeaderMenuItem({ eventKey, action }) {
  return <MenuItem eventKey={eventKey}>{action}</MenuItem>;
}

export { HeaderMenuItem };
