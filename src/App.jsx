import React, { Suspense, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCurrentUserStore } from "./data/stores/useCurrentUserStore";
import { useDarkTheme } from "./data/stores/useDarkTheme";
import i18n from "./data/configLang/i18n";
import LocaleContext from "./data/configLang/LocaleContext.js";
import Header from "./components/header/Header";
import UserPage from "./components/userPage/UserPage";
import MainPage from "./components/mainPage/MainPage";
import Loading from "./components/helper/Loading";

function App() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  return (
    <div className={isDarkTheme ? "bg-dark min-vh-100" : ""}>
      <BrowserRouter>
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <Suspense fallback={<Loading />}>
            <Container>
              <Header />
              <Routes>
                <Route path="/" element={<MainPage bg="dark" />} />
                {isAuth && <Route path="/userpage" element={<UserPage />} />}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Container>
          </Suspense>
        </LocaleContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
