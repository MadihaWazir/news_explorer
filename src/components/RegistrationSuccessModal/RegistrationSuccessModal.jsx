import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegistrationSuccessModal.css";

function RegistrationSuccessModal({ isOpen, onClose, onSwitchToLogin }) {
  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose();
    onSwitchToLogin();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Registration Successfully Completed!"
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
