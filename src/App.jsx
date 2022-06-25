import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCurrentUserStore } from "./data/stores/useCurrentUserStore";
import { useDarkTheme } from "./data/stores/useDarkTheme";
import { useThemesStore } from "./data/stores/useThemesStore";
import i18n from "./data/configLang/i18n";
import LocaleContext from "./data/configLang/LocaleContext.js";
import Header from "./components/header/Header";
import UserPage from "./components/userPage/UserPage";
import MainPage from "./components/mainPage/MainPage";
import Loading from "./components/helper/Loading";
import { getThemes } from "./api/themesAPI";

function App() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const setThemes = useThemesStore((state) => state.setThemes);
  const [locale, setLocale] = useState(i18n.language);

  const setThemesCollection = async () => {
    const themes = await getThemes();
    setThemes(themes);
  };

  useEffect(() => {
    setThemesCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  return (
    <div
      className="bg-image min-vh-100"
      style={
        isDarkTheme
          ? {
              backgroundImage: `url("images/Background.jpg")`,
              backgroundSize: "cover",
            }
          : null
      }
    >
      <BrowserRouter>
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <Suspense fallback={<Loading />}>
            <Container>
              <Header />
              <Routes>
                <Route path="/" element={<MainPage />} />
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
