import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useParams } from "react-router-dom";
import { getCollection } from "../../api/collectionAPI";
import Loading from "../helper/Loading";
import MDEditor from "@uiw/react-md-editor";
import { Card, ListGroup, Button } from "react-bootstrap";
import CollectionPageHeader from "./CollectionPageHeader";

function CollectionPage() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const params = useParams();
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

  console.log(collection);

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
              <Card.Text>
                <dl className="row">
                  <dt className="col-sm-3">Author</dt>
                  <dd className="col-sm-9">{author.name}</dd>
                  <dt className="col-sm-3">Theme</dt>
                  <dd className="col-sm-9">{theme.name}</dd>
                </dl>
              </Card.Text>
              <dl data-color-mode={isDarkTheme ? "dark" : "light"}>
                <dt className="mb-3">Descripton:</dt>
                <MDEditor.Markdown
                  source={description}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </dl>

              <Card.Text>
                <dl className="row">
                  <dt className="col-sm-3">Date of create:</dt>
                  <dd className="col-sm-9">{createdAtLocale}</dd>
                  <dt className="col-sm-3">Date of update:</dt>
                  <dd className="col-sm-9">{updatedAtLocale}</dd>
                </dl>
              </Card.Text>
              {items.length > 0 ? (
                <Card.Text>
                  <dl>
                    <dt className="mb-3">{`Items (${items.length}):`}</dt>
                  </dl>
                  <ListGroup>
                    {items.map((item) => {
                      return (
                        <ListGroup.Item key={item._id} action variant="dark">
                          <b>{item.title}</b>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Card.Text>
              ) : (
                <div>
                  <Card.Text>
                    Unfortunately, there are no entries yet...
                  </Card.Text>
                </div>
              )}
              {isAuth && (
                <div className="my-3">
                  <Button variant="outline-success">Add item</Button>
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
