import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function ButtonsActionsTable({
  object,
  setObject,
  setShowForm,
  deleteObject,
  urlTo,
}) {
  const redirect = useNavigate();

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
        variant="outline-info"
        className="me-2"
        onClick={() => redirect(`/userpage/${urlTo}${object._id}`)}
      >
        <i class="bi bi-info-square"></i> Info
      </Button>
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
