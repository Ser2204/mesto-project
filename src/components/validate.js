const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      inputElement.getAttribute("data_error_message")
    );
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitForm = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitForm, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitForm, inactiveButtonClass);
    });
  });
};
const toggleButtonState = (inputList, submitForm, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitForm, inactiveButtonClass);
  } else {
    enableSubmitButton(submitForm, inactiveButtonClass);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inputErrorClass,
      errorClass,
      inactiveButtonClass
    );
  });
};

export function disableSubmitButton(submitForm, inactiveButtonClass) {
  submitForm.setAttribute("disabled", "");
  submitForm.classList.add(inactiveButtonClass);
}
export function enableSubmitButton(submitForm, inactiveButtonClass) {
  submitForm.removeAttribute("disabled");
  submitForm.classList.remove(inactiveButtonClass);
}
