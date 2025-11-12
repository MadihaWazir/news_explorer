import "./LoginModal.css";
import useFormValidator from "../Form/useFormValidator";
import ModalwithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const { values, errors, handleChange, isValid } = useFormValidator({}, [
    "email",
    "password",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(values);
    }
  };

  return (
    <ModalwithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isSubmitDisabled={!isValid}
      alternateText={
        <>
          or{" "}
          <span className="modal__link-text" onClick={onSwitchToRegister}>
            Sign Up
          </span>
        </>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
          placeholder="Enter email"
        />
        {errors.email && (
          <span className="modal__error-message modal__error-message_visible">
            {errors.email}
          </span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalwithForm>
  );
}

export default LoginModal;
