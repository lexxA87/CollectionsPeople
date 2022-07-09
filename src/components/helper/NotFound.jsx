import React from "react";
import { Figure } from "react-bootstrap";

function NotFound() {
  return (
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
  );
}

export default NotFound;
