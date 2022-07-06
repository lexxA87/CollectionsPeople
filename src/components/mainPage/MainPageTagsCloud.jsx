import React from "react";
import { TagCloud } from "react-tagcloud";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Card } from "react-bootstrap";

import "./MainPage.css";

function MainPageTagsCloud() {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  const data = [
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
  ];

  return (
    <Card
      bg={isDarkTheme && "dark"}
      text={isDarkTheme && "light"}
      className="text-center"
    >
      <Card.Body>
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={data}
          className="simple-cloud"
          onClick={(tag) => alert(`'${tag.value}' ${tag.count} was selected!`)}
        />
      </Card.Body>
    </Card>
  );
}

export default MainPageTagsCloud;
