import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CollectionCard({ item }) {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

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
          <dt className="col-sm-4 col-md-6 col-lg-4">Collection</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">
            {collectionParent.title}
          </dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">Author</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{author.name}</dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">Tags</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{tags.length}</dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">Likes</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{likes}</dd>
          <dt className="col-sm-4 col-md-6 col-lg-4">Comments</dt>
          <dd className="col-sm-8 col-md-6 col-lg-8">{comments.length}</dd>
        </dl>
      </Card.Body>
      <Card.Footer>
        <small>Last updated {updatedAtLocale}</small>
      </Card.Footer>
    </Card>
  );
}

export default CollectionCard;
