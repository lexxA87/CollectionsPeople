import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Card } from "react-bootstrap";

function UserPageWelcome({ userName }) {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  return (
    <Card
      bg={isDarkTheme && "dark"}
      text={isDarkTheme && "light"}
      className="text-center"
    >
      <Card.Body>
        <Card.Title>
          Hey, nice to see you{" "}
          <span className="fw-bold lh-lg text-warning">{userName}</span>
        </Card.Title>
        <Card.Text>
          It's your home page. Here's all your collections. Good luck!
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserPageWelcome;
