import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationSuccessModal({ isOpen, onClose, onSwitchToLogin }) {
  const handleLoginClick = (e) => {
    e.preventDefault();
    onSwitchToLogin();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Registration Successful"}
      onSubmit={handleLoginClick}
      submitButtonText=""
      isSubmitDisabled={false}
    >
      <div className="modal__success-message">
        <button
          type="button"
          className="modal__button-success"
          onClick={handleLoginClick}
        >
          Sign In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegistrationSuccessModal;
