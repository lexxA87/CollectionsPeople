import React from "react";
import { useTranslation } from "react-i18next";
import { Figure } from "react-bootstrap";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Figure>
        <Figure.Image
          width={300}
          height={300}
          alt="Not Found"
          src="/images/noSearchResult.jpg"
        />
        <Figure.Caption>
          <h1 className="display-6 text-warning">{t("noFound")}</h1>
        </Figure.Caption>
      </Figure>
    </div>
  );
}

export default NotFound;
