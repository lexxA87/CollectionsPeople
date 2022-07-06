import React from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Container } from "react-bootstrap";
import configData from "../../data/config.json";
import { Link } from "react-router-dom";

function Footer() {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  return (
    <Container
      fluid
      className={
        isDarkTheme
          ? "bg-dark text-light text-center p-3"
          : "bg-light text-center mb-3"
      }
    >
      <strong>
        <a
          href={configData.GIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          {configData.AUTHOR}
          <i className="bi bi-github"></i>
        </a>
      </strong>
    </Container>
  );
}

export default Footer;
