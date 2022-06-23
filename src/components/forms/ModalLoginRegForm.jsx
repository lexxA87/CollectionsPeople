import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function ModalLoginRegForm(props) {
  const { showLoginModal, handleCloseLoginModal } = props;
  const [showLogin, setShowLogin] = useState(true);
  const { t } = useTranslation();

  const handleClose = () => {
    handleCloseLoginModal();
    setShowLogin(true);
  };

  return (
    <Modal show={showLoginModal} onHide={handleClose}>
      {showLogin ? (
        <LoginForm setShowLogin={setShowLogin} handleClose={handleClose} />
      ) : (
        <RegistrationForm setShowLogin={setShowLogin} />
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLoginRegForm;
