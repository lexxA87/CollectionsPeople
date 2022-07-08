import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

function CollectionPageHeader({ isAuth }) {
  const { t } = useTranslation();
  const redirect = useNavigate();
  return (
    <div className="row mt-2">
      <div className="col-md-10 col-6">
        <Button
          variant="outline-success"
          className="me-3"
          onClick={() => redirect("/")}
        >
          <i className="bi bi-arrow-up-square"></i> {t("toMainPage")}
        </Button>
      </div>
      {isAuth && (
        <div className="col-md-2 col-6 text-end">
          <Button
            variant="outline-success"
            onClick={() => redirect("/userpage")}
          >
            <i className="bi bi-house-door"></i> {t("toHomePage")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CollectionPageHeader;
