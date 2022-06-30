import React from "react";
import { Card, Button } from "react-bootstrap";

function CollectionPage() {
  return (
    <Card className="mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <Card.Img src="#" />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>

            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default CollectionPage;
