import React from "react";
import { useTranslation } from "react-i18next";
import NotFound from "../helper/NotFound";

function ItemsPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center">
        <h1 className="display-6 text-warning">{t("allItemsPage")}</h1>
      </div>
      <NotFound />
    </>
  );
}

export default ItemsPage;
