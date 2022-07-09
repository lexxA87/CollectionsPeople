import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Spinner,
  Stack,
} from "react-bootstrap";
import ModalLoginRegForm from "../forms/ModalLoginRegForm";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { userAuth } from "../../api/userAPI.js";
import { useTranslation } from "react-i18next";
import LocaleContext from "../../data/configLang/LocaleContext";
import i18n from "../../data/configLang/i18n";
import SearchForm from "../forms/SearchForm";

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const setIsAuth = useCurrentUserStore((state) => state.setIsAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const setDarkTheme = useDarkTheme((state) => state.setDarkTheme);
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  const authUserWithToken = async () => {
    if (localStorage.getItem("token")) {
      const user = await userAuth();
      if (user.name) {
        setCurrentUser(user);
        setIsAuth(true);
      }
    }

    setIsLoadingUser(false);
  };

  useEffect(() => {
    authUserWithToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    setIsAuth(false);
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <Navbar
      bg={isDarkTheme ? "dark" : "light"}
      variant={isDarkTheme ? "dark" : "light"}
      expand="lg"
      sticky="top"
      className={isDarkTheme ? "border-bottom" : "shadow-sm rounded"}
    >
      <Container fluid>
        <NavLink className="text-decoration-none" to="/">
          <Navbar.Brand className="fw-semibold">
            <i className="bi bi-collection mx-2"></i>Collections
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="row">
          <SearchForm />

          <Form className="d-flex mx-auto my-3 col-lg-3 justify-content-center">
            <Form.Switch
              defaultChecked={isDarkTheme}
              label={t("darkTheme")}
              isValid={isDarkTheme}
              onChange={(e) => setDarkTheme(e.target.checked)}
            />
          </Form>

          <ToggleButtonGroup
            className="d-flex mx-auto my-3 col-lg-2 col-sm-6"
            name="lang"
            defaultValue={locale}
            onChange={(e) => changeLocale(e)}
          >
            <ToggleButton
              id="tbg-check-1"
              value="en"
              variant={isDarkTheme ? "outline-success" : "outline-secondary"}
            >
              English
            </ToggleButton>
            <ToggleButton
              id="tbg-check-2"
              value="ru"
              variant={isDarkTheme ? "outline-success" : "outline-secondary"}
            >
              Русский
            </ToggleButton>
          </ToggleButtonGroup>

          <Stack
            direction="horizontal"
            gap={3}
            className="d-flex mx-auto my-3 col-lg-3 justify-content-end"
          >
            {isLoadingUser ? (
              <Spinner
                animation="border"
                variant={isDarkTheme ? "success" : "secondary"}
              />
            ) : isAuth ? (
              <>
                <div
                  className={
                    isDarkTheme ? "text-center text-success" : "text-center"
                  }
                >
                  {t("greeting")}
                  <br />
                  <NavLink className="fw-bolder" to="userpage">
                    {currentUser.name}
                  </NavLink>
                </div>
                <Button variant="outline-danger" onClick={logout} size="sm">
                  {t("logout")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-success"
                  onClick={handleShowLoginModal}
                >
                  {t("login")}
                </Button>
              </>
            )}
          </Stack>

          <ModalLoginRegForm
            showLoginModal={showLoginModal}
            handleCloseLoginModal={handleCloseLoginModal}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
