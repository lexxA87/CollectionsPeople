import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CollectionCard({ collection }) {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  const { title, theme, updatedAt, author, items, _id } = collection;

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
            to={`/collection${_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {title}
          </Link>
        </Card.Title>
        <Card.Text>
          <dl className="row">
            <dt className="col-sm-4 col-md-6 col-lg-4">Author</dt>
            <dd className="col-sm-8 col-md-6 col-lg-8">{author.name}</dd>
            <dt className="col-sm-4 col-md-6 col-lg-4">Theme</dt>
            <dd className="col-sm-8 col-md-6 col-lg-8">{theme.name}</dd>
            <dt className="col-sm-4 col-md-6 col-lg-4">Items</dt>
            <dd className="col-sm-8 col-md-6 col-lg-8">{items.length}</dd>
          </dl>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>Last updated {updatedAtLocale}</small>
      </Card.Footer>
    </Card>
  );
}

export default CollectionCard;
