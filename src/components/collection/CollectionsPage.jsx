import React from "react";
import { useTranslation } from "react-i18next";
import NotFound from "../helper/NotFound";

function CollectionsPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center">
        <h1 className="display-6 text-warning">{t("allCollectionsPage")}</h1>
      </div>
      <NotFound />
    </>
  );
}

export default CollectionsPage;
