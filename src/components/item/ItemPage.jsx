import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../api/itemsAPI";
import Loading from "../helper/Loading";
import { Card, ListGroup } from "react-bootstrap";
import CollectionPageHeader from "../collection/CollectionPageHeader";

function ItemPage() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const params = useParams();
  const redirect = useNavigate();
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

              <dl className="row">
                <dt className="col-sm-3">Collection</dt>
                <dd className="col-sm-9">{collectionParent.name}</dd>
                <dt className="col-sm-3">Author</dt>
                <dd className="col-sm-9">{author.name}</dd>
                <dt className="col-sm-3">Likes</dt>
                <dd className="col-sm-9">{likes.length}</dd>
              </dl>

              <dl className="row mt-3">
                <dt className="col-sm-3">Date of create:</dt>
                <dd className="col-sm-9">{createdAtLocale}</dd>
                <dt className="col-sm-3">Date of update:</dt>
                <dd className="col-sm-9">{updatedAtLocale}</dd>
              </dl>

              {tags.length > 0 ? (
                <div className="mb-3">
                  {/* <dl>
                    <dt className="mb-3">{`Items (${items.length}):`}</dt>
                  </dl>
                  <ListGroup>
                    {items.map((item) => {
                      return (
                        <ListGroup.Item
                          onClick={() =>
                            redirect(`/collection/item${item._id}`)
                          }
                          key={item._id}
                          action
                          variant="dark"
                          className="text-success"
                        >
                          <b>{item.title}</b>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup> */}
                </div>
              ) : (
                <div className="mb-3">
                  <Card.Text>
                    Unfortunately, there are no entries yet...
                  </Card.Text>
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
