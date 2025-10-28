import { useState, useEffect } from "react";

export default function useFormValidator(
  initialValues = {},
  requiredFields = []
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!emailPattern.test(value)) {
        error = "Please enter a valid email.";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters.";
      }
    } else if (name === "name") {
      if (!value) {
        error = "Name is required";
      } else if (value.length < 2) {
        error = "Name must be at least 2 characters.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }

  useEffect(() => {
    const allRequiredFilled = requiredFields.every(
      (field) => values[field] && !values[field].trim() !== ""
    );
    const noErrors = Object.values(errors).every((error) => !error);

    setIsValid(allRequiredFilled && noErrors);
  }, [values, errors, requiredFields]);

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
