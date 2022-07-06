import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useCurrentUserStore } from "./data/stores/useCurrentUserStore";
import { useDarkTheme } from "./data/stores/useDarkTheme";
import { useThemesStore } from "./data/stores/useThemesStore";
import i18n from "./data/configLang/i18n";
import LocaleContext from "./data/configLang/LocaleContext.js";
import Header from "./components/header/Header";
import UserPage from "./components/userPage/UserPage";
import MainPage from "./components/mainPage/MainPage";
import CollectionPage from "./components/collection/CollectionPage";
import ItemPage from "./components/item/ItemPage";
import ItemsTable from "./components/userPage/tables/ItemsTable";
import SearchPage from "./components/searchResult/SearchPage";
import Loading from "./components/helper/Loading";
import { getThemes } from "./api/themesAPI";

import "./App.css";

function App() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const setThemes = useThemesStore((state) => state.setThemes);
  const [locale, setLocale] = useState(i18n.language);
  const location = useLocation();
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
              backgroundAttachment: "fixed",
            }
          : {
              backgroundImage: `url("images/Background-light.jpg")`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }
      }
    >
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Suspense fallback={<Loading />}>
          <Container>
            <Header />

            <TransitionGroup component={null}>
              <CSSTransition key={location.key} classNames="page" timeout={300}>
                <Routes location={location}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/collection:id" element={<CollectionPage />} />
                  <Route path="/collection/item:id" element={<ItemPage />} />
                  {isAuth && (
                    <>
                      <Route path="/userpage" element={<UserPage />} />
                      <Route
                        path="/userpage/collection:id"
                        element={<ItemsTable />}
                      />
                    </>
                  )}
                  <Route path="/searchpage/tag:id" element={<SearchPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </Container>
        </Suspense>
      </LocaleContext.Provider>
    </div>
  );
}

export default App;
