import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

function UserPageWelcome({ userName }) {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const { t } = useTranslation();

  return (
    <Card
      bg={isDarkTheme && "dark"}
      text={isDarkTheme && "light"}
      className="text-center"
    >
      <Card.Body>
        <Card.Title>
          {t("niceToSeeYou")}
          <span className="fw-bold lh-lg text-warning">{userName}</span>
        </Card.Title>
        <Card.Text>{t("descUserPage")}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserPageWelcome;
