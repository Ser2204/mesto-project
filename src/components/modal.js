// !! функции popup
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscape);
  popup.addEventListener("click", closeOverlay);
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscape);
  popup.removeEventListener("click", closeOverlay);
}
function closeEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
function closeOverlay(evt) {
  if (evt.target.classList.contains("popup__overlay")) {
    closePopup(evt.currentTarget);
  }
}
