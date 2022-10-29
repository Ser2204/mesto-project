// !! функции popup
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

let openedPopup;

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  openedPopup = popup;
  document.addEventListener("keydown", closeEscape);
  popup.addEventListener("click", closeOverlay);
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscape);
  openedPopup.removeEventListener("click", closeOverlay);
}
function closeEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}
function closeOverlay(evt) {
  if (evt.target === openedPopup.querySelector(".popup__overlay")) {
    closePopup(openedPopup);
    openedPopup = null;
  }
}

export function disableSubmitButton(submitForm) {
  submitForm.setAttribute("disabled", "");
  submitForm.classList.add("popup__save-button_disabled");
}
export function enableSubmitButton(submitForm) {
  submitForm.removeAttribute("disabled");
  submitForm.classList.remove("popup__save-button_disabled");
}
