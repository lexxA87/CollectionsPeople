import React from "react";
import { Figure } from "react-bootstrap";

function CollectionsPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="display-6 text-warning">All Collections Page</h1>
      </div>
      <div className="text-center">
        <Figure>
          <Figure.Image
            width={300}
            height={300}
            alt="Not Found"
            src="/images/noSearchResult.jpg"
          />
          <Figure.Caption>
            <h1 className="display-6 text-warning">Not Found...</h1>
          </Figure.Caption>
        </Figure>
      </div>
    </>
  );
}

export default CollectionsPage;
