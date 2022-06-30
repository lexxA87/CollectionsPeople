import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../api/collectionAPI";
import { Card } from "react-bootstrap";

function CollectionPage() {
  const params = useParams();
  const [collection, setCollection] = useState({});
  const collectionID = params.id;

  const setCurrentCollection = async (id) => {
    const coll = await getCollection(id);
    setCollection(coll);
  };

  useEffect(() => {
    setCurrentCollection(collectionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, description, theme, createdAt, updatedAt, author } =
    collection;
  console.log(collection);

  return (
    <Card className="mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <Card.Img src="/images/Not-image.jpg" style={{ maxwidth: "300px" }} />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{author}</Card.Text>
            <Card.Text>{theme}</Card.Text>
            <Card.Text>{description}</Card.Text>
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
