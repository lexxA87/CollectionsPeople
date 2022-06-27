import React from "react";
import { Button } from "react-bootstrap";

function ButtonsActionsTable({ object, setObject, setShowForm, subInfo }) {
  const editForm = () => {
    setObject(object);
    setShowForm(true);
  };

  return (
    <div className="text-center">
      <Button
        size="sm"
        variant="outline-info"
        className="me-2"
        {...subInfo.getToggleRowExpandedProps()}
      >
        <i className="bi bi-info-lg"></i>
      </Button>
      <Button
        size="sm"
        variant="outline-success"
        className="me-2"
        onClick={editForm}
      >
        <i className="bi bi-pencil-square"></i> Edit
      </Button>
      <Button size="sm" variant="outline-danger">
        <i className="bi bi-trash3"></i>
      </Button>
    </div>
  );
}

export default ButtonsActionsTable;
