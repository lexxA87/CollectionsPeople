import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCurrentUserStore } from "./data/stores/useCurrentUserStore";
import Header from "./components/header/Header";
import UserPage from "./components/userPage/UserPage";
import MainPage from "./components/mainPage/MainPage";

function App() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage bg="dark" />} />
          {isAuth && <Route path="/userpage" element={<UserPage />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
