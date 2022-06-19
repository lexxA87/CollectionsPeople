import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  useEffect(() => {
    console.log("useEffect app");
  });

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<h1>React</h1>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
