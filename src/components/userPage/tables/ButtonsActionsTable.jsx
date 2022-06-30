import React from "react";
import { Button } from "react-bootstrap";

function ButtonsActionsTable({ object, setObject, setShowForm, deleteObject }) {
  const editForm = () => {
    setObject(object);
    setShowForm(true);
  };

  const handleDelete = async () => {
    const id = object._id;
    await deleteObject(id);
    setObject({});
  };

  return (
    <div className="text-center">
      <Button
        size="sm"
        variant="outline-success"
        className="me-2"
        onClick={editForm}
      >
        <i className="bi bi-pencil-square"></i> Edit
      </Button>
      <Button size="sm" variant="outline-danger" onClick={handleDelete}>
        <i className="bi bi-trash3"></i>
      </Button>
    </div>
  );
}

export default ButtonsActionsTable;
