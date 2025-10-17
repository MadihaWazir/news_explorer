import React from "react";
import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  submitButtonText,
  isSubmitDisabled = false,
  alternateText,
  children,
  serverMessage,
}) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close"
        />

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          {serverMessage && (
            <span className="modal__server-message">{serverMessage}</span>
          )}

          {submitButtonText && (
            <button
              type="submit"
              className="modal__submit-button"
              disabled={isSubmitDisabled}
            >
              {submitButtonText}
            </button>
          )}

          {alternateText && (
            <p className="modal__link-option">{alternateText}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
