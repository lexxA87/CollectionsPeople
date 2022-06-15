import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <NavLink className="text-decoration-none" to="/">
          <Navbar.Brand className="fw-semibold">Collections</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto my-2 my-lg-0">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Form className="d-flex mx-auto my-2 my-lg-0">
            <Form.Check type="switch" id="switchTheme" label="Dark theme" />
          </Form>
          <Form className="d-flex mx-auto my-2 my-lg-0">
            <Form.Select aria-label="Default select example">
              <option value="en_US">English</option>
              <option value="ru">Russian</option>
            </Form.Select>
          </Form>
          <Button variant="success" className="mx-auto my-2 my-lg-0">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
      {/* <div>LOGO</div>
      <div>Search</div>
      <div>Theme</div>
      <div>Lang</div>
      <div>Enter</div> */}
    </Navbar>
  );
}

export default Header;
