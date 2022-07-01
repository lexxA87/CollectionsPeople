import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useParams } from "react-router-dom";
import { getCollection } from "../../api/collectionAPI";
import Loading from "../helper/Loading";
import MDEditor from "@uiw/react-md-editor";
import { Card } from "react-bootstrap";

function CollectionPage() {
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

  const { title, description, theme, createdAt, updatedAt, author } =
    collection;
  console.log(collection);

  return isLoading ? (
    <Loading />
  ) : (
    <Card
      className="mb-3"
      bg={isDarkTheme ? "dark" : "light"}
      text={isDarkTheme ? "white" : "dark"}
    >
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
            <Card.Title>{title}</Card.Title>
            <Card.Text>{author.name}</Card.Text>
            <Card.Text>{theme.name}</Card.Text>
            <div data-color-mode={isDarkTheme ? "dark" : "light"}>
              <MDEditor.Markdown
                source={description}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>

            <Card.Text>
              <small>{createdAt}</small>
            </Card.Text>
            <Card.Text>
              <small>{updatedAt}</small>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default CollectionPage;
