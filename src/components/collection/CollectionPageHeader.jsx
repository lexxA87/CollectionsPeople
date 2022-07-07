import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function CollectionPageHeader({ isAuth }) {
  const redirect = useNavigate();
  return (
    <div className="row mt-2">
      <div className="col-md-10 col-6">
        <Button
          variant="outline-success"
          className="me-3"
          onClick={() => redirect("/")}
        >
          <i className="bi bi-arrow-up-square"></i> to main
        </Button>
      </div>
      {isAuth && (
        <div className="col-md-2 col-6 text-end">
          <Button
            variant="outline-success"
            onClick={() => redirect("/userpage")}
          >
            <i className="bi bi-house-door"></i> Home
          </Button>
        </div>
      )}
    </div>
  );
}

export default CollectionPageHeader;
