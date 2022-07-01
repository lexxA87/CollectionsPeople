import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../api/collectionAPI";
import Loading from "../helper/Loading";
import MDEditor from "@uiw/react-md-editor";
import { Card } from "react-bootstrap";

function CollectionPage() {
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
    <Card className="mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <Card.Img src="/images/Not-image.jpg" style={{ maxwidth: "300px" }} />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{author.name}</Card.Text>
            <Card.Text>{theme.name}</Card.Text>
            <div data-color-mode="dark">
              <MDEditor.Markdown
                source={description}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>

            <Card.Text>
              <small className="text-muted">{createdAt}</small>
            </Card.Text>
            <Card.Text>
              <small className="text-muted">{updatedAt}</small>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default CollectionPage;
