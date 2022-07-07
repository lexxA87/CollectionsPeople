import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CollectionCard({ item }) {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const { t } = useTranslation();

  const {
    title,
    updatedAt,
    likes,
    comments,
    collectionParent,
    tags,
    author,
    _id,
  } = item;

  const updatedAtDate = new Date(updatedAt);
  const updatedAtLocale = updatedAtDate.toLocaleDateString("en-US");

  return (
    <Card
      className="mb-3"
      bg={isDarkTheme ? "dark" : "light"}
      text={isDarkTheme ? "white" : "dark"}
    >
      <Card.Img variant="top" src="/images/Not-image.jpg" alt="Card image" />

      <Card.Body>
        <Card.Title className="text-warning">
          <Link
            to={`/collection/item${_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {title}
          </Link>
        </Card.Title>

        <dl className="row">
          <dt className="col-sm-4 col-md-6 col-lg-4">{t("collection")}</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">
            {collectionParent.title}
          </dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">{t("author")}</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{author.name}</dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">{t("tags")}</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{tags.length}</dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">{t("likes")}</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{likes}</dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">{t("comments")}</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{comments.length}</dd>
        </dl>
      </Card.Body>
      <Card.Footer>
        <small>
          {t("lastUpdated")} {updatedAtLocale}
        </small>
      </Card.Footer>
    </Card>
  );
}

export default CollectionCard;
