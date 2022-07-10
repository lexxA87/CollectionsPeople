import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

function Likes({ likes }) {
  const [likesCount, setLikesCount] = useState(5);
  const [isLike, setIsLike] = useState(false);

  const clickLike = () => {
    if (isLike) {
      setLikesCount(likes);
    } else {
      setLikesCount(likes + 1);
    }
    setIsLike(!isLike);
  };

  useEffect(() => {
    setLikesCount(likes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-3">
      <i
        className={`bi bi-heart-fill ${isLike ? "text-danger" : ""}`}
        role="button"
        onClick={clickLike}
      ></i>
      {"  "}
      <Badge pill bg="danger">
        {likesCount}
      </Badge>
    </div>
  );
}

export default Likes;
