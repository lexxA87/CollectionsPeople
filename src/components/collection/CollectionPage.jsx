import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useNavigate, useParams } from "react-router-dom";
import { getCollection } from "../../api/collectionAPI";
import Loading from "../helper/Loading";
import MDEditor from "@uiw/react-md-editor";
import { Card, ListGroup } from "react-bootstrap";
import CollectionPageHeader from "./CollectionPageHeader";

function CollectionPage() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const params = useParams();
  const redirect = useNavigate();
  const [collection, setCollection] = useState({});
  const [isLoading, setLoading] = useState(true);
  const collectionID = params.id;

  const setCurrentCollection = async (id) => {
    const coll = await getCollection(id);
    setCollection(coll);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentCollection(collectionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, description, theme, createdAt, updatedAt, author, items } =
    collection;
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
                <dt className="col-sm-3">Author</dt>
                <dd className="col-sm-9">{author.name}</dd>
                <dt className="col-sm-3">Theme</dt>
                <dd className="col-sm-9">{theme.name}</dd>
              </dl>

              <dl data-color-mode={isDarkTheme ? "dark" : "light"}>
                <dt className="mb-3">Descripton:</dt>
              </dl>
              <MDEditor.Markdown
                source={description}
                style={{ whiteSpace: "pre-wrap" }}
              />

              <dl className="row mt-3">
                <dt className="col-sm-3">Date of create:</dt>
                <dd className="col-sm-9">{createdAtLocale}</dd>
                <dt className="col-sm-3">Date of update:</dt>
                <dd className="col-sm-9">{updatedAtLocale}</dd>
              </dl>

              {items.length > 0 ? (
                <div className="mb-3">
                  <dl>
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
                  </ListGroup>
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

export default CollectionPage;
