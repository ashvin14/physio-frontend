import React, { Component } from "react";
import { MenuItem } from "react-bootstrap";

function HeaderMenuItem({ eventKey, action, onComponentClick }) {
  return (
    <MenuItem eventKey={eventKey} onClick={onComponentClick}>
      {action}
    </MenuItem>
  );
}

export { HeaderMenuItem };
