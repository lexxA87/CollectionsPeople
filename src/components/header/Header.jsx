import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm rounded">
      <Container fluid>
        <NavLink className="text-decoration-none" to="/">
          <Navbar.Brand className="fw-semibold">Collections</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto my-3">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          {/* <Form.Check
            className="d-flex mx-auto my-3"
            type="switch"
            id="switchTheme"
            label="Dark theme"
          /> */}
          <Form className="d-flex mx-auto my-3">
            <Form.Switch label="Dark theme" />
          </Form>

          <ToggleButtonGroup
            className="d-flex mx-auto my-3"
            name="lang"
            defaultValue="en_US"
          >
            <ToggleButton
              id="tbg-check-1"
              value="en_US"
              variant="outline-secondary"
            >
              English
            </ToggleButton>
            <ToggleButton
              id="tbg-check-2"
              value="ru"
              variant="outline-secondary"
            >
              Russian
            </ToggleButton>
          </ToggleButtonGroup>

          <Button variant="success" className="mx-auto my-3">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
