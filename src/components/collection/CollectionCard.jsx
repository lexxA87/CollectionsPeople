import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Card } from "react-bootstrap";

function CollectionCard({ collection }) {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  const { title, theme, updatedAt, author, items } = collection;

  const updatedAtDate = new Date(updatedAt);
  const updatedAtLocale = updatedAtDate.toLocaleDateString("en-US");

  return (
    <Card
      className="mb-3"
      bg={isDarkTheme ? "dark" : "light"}
      text={isDarkTheme ? "white" : "dark"}
    >
      <Card.Img variant="top" src="/images/Not-image.jpg" />
      <Card.Body>
        <Card.Title className="text-warning">{title}</Card.Title>
        <Card.Text>
          <dl className="row">
            <dt className="col-sm-3">Author</dt>
            <dd className="col-sm-9">{author.name}</dd>
            <dt className="col-sm-3">Theme</dt>
            <dd className="col-sm-9">{theme.name}</dd>
            <dt className="col-sm-3">Items</dt>
            <dd className="col-sm-9">{items.length}</dd>
          </dl>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated {updatedAtLocale}</small>
      </Card.Footer>
    </Card>
  );
}

export default CollectionCard;
