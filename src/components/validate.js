export { configValidate, enableValidation, disableSubmitButton };

const configValidate = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit_disabled",
};

const isValid = (formElement, inputElement, configValidate) => {
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
      configValidate
    );
  } else {
    hideInputError(formElement, inputElement, configValidate);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configValidate
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidate.errorClass);
};

const hideInputError = (formElement, inputElement, configValidate) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidate.inputErrorClass);
  errorElement.classList.remove(configValidate.errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (formElement, configValidate) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidate.inputSelector)
  );
  const submitForm = formElement.querySelector(
    configValidate.submitButtonSelector
  );
  toggleButtonState(inputList, submitForm, configValidate);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, configValidate);
      toggleButtonState(inputList, submitForm, configValidate);
    });
  });
};
const toggleButtonState = (inputList, submitForm, configValidate) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitForm, configValidate);
    //submitForm.setAttribute("disabled", "");
    //submitForm.classList.add(configValidate.inactiveButtonClass);
  } else {
    enableSubmitButton(submitForm, configValidate);
    //submitForm.removeAttribute("disabled");
    //submitForm.classList.remove(configValidate.inactiveButtonClass);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableValidation = ({ configValidate }) => {
  const formList = Array.from(
    document.querySelectorAll(configValidate.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, configValidate);
  });
};

function disableSubmitButton(submitForm, configValidate) {
  submitForm.setAttribute("disabled", "");
  submitForm.classList.add(configValidate.inactiveButtonClass);
}
function enableSubmitButton(submitForm, configValidate) {
  submitForm.removeAttribute("disabled");
  submitForm.classList.remove(configValidate.inactiveButtonClass);
}
