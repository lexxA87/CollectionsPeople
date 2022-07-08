import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { Link, useParams } from "react-router-dom";
import { getItem } from "../../api/itemsAPI";
import Loading from "../helper/Loading";
import { Card } from "react-bootstrap";
import CollectionPageHeader from "../collection/CollectionPageHeader";
import Comment from "./Comment";

function ItemPage() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const params = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);
  const itemID = params.id;

  const setCurrentItem = async (id) => {
    const item = await getItem(id);
    setItem(item);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentItem(itemID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    title,
    collectionParent,
    likes,
    createdAt,
    updatedAt,
    author,
    tags,
    comments,
  } = item;

  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);
  const createdAtLocale = createdAtDate.toLocaleDateString("en-US");
  const updatedAtLocale = updatedAtDate.toLocaleDateString("en-US");

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Card
        className="mb-3"
        bg={isDarkTheme ? "dark" : "light"}
        text={isDarkTheme ? "white" : "dark"}
      >
        <Card.Header>
          <CollectionPageHeader isAuth={isAuth} />
        </Card.Header>
        <div className="row overflow-hidden">
          <div className="col-md-4">
            <Card.Img
              src="/images/Not-image.jpg"
              style={{ maxHeight: "300px" }}
              className="m-md-3"
            />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title>
                <h1 className="display-6 text-warning">{title}</h1>
              </Card.Title>

              <dl className="row mb-3">
                <dt className="col-sm-3">Collection</dt>
                <dd className="col-sm-9">{collectionParent.title}</dd>
                <dt className="col-sm-3">Author</dt>
                <dd className="col-sm-9">{author.name}</dd>
                <dt className="col-sm-3">Likes</dt>
                <dd className="col-sm-9">{likes}</dd>
                <dt className="col-sm-3">Date of create:</dt>
                <dd className="col-sm-9">{createdAtLocale}</dd>
                <dt className="col-sm-3">Date of update:</dt>
                <dd className="col-sm-9">{updatedAtLocale}</dd>
                <dt className="col-sm-3">Tags</dt>
                <dd className="col-sm-9">
                  {tags.length ? (
                    tags.map((tag) => {
                      return (
                        <p>
                          <Link to={`/searchpage/tag${tag._id}`}>
                            {tag.title}
                          </Link>
                        </p>
                      );
                    })
                  ) : (
                    <span>No tags yet...</span>
                  )}
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">Comments</dt>
              </dl>
              {comments.length ? (
                comments.map((comment) => {
                  return <Comment comment={comment} />;
                })
              ) : (
                <div className="mb-3">
                  <Card.Text>No comments yet...</Card.Text>
                </div>
              )}
            </Card.Body>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ItemPage;
