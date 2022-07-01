import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ButtonsActionsTable from "../userPage/tables/ButtonsActionsTable";

function CollectionPageHeader({ isAuth }) {
  const redirect = useNavigate();
  return (
    <div className="row mt-2">
      <div className="col-md-10 col-6">
        <Button variant="outline-success" onClick={() => redirect("/")}>
          <i class="bi bi-arrow-up-square"></i> to main
        </Button>
      </div>
      {isAuth && (
        <div className="col-md-2 col-6">
          <ButtonsActionsTable />
        </div>
      )}
    </div>
  );
}

export default CollectionPageHeader;
