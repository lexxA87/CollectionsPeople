import React from "react";
import { Toast } from "react-bootstrap";

function Comment({ comment }) {
  return (
    <div>
      <Toast
        className="d-inline-block m-1"
        // bg={variant.toLowerCase()}
        // key={idx}
      >
        <Toast.Header>
          <strong className="me-auto">{comment.author}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body
        //  className={variant === "Dark" && "text-white"}
        >
          {comment.text}
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default Comment;
