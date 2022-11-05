import "./pages/index.css";
import {
  buttonEdit,
  buttonAvatar,
  buttonAdd,
  popupEditProfile,
  formEdit,
  nameInput,
  jobInput,
  nameTitle,
  jobTitle,
  popupAddCard,
  formAddCard,
  nameImagePopup,
  linkImagePopup,
  elementContainer,
  elementTemplate,
  buttonSubmitChangeAvatar,
  popupLookCloser,
  imageLookCloser,
  nameLookCloser,
  popupChangeAvatar,
  formChangeAvatar,
  linkChangeAvatar,
  elementUserAvatar,
  buttonSubmitAddCard,
  buttonSubmitEditProfile,
} from "./components/utils";

import { initialCards } from "./components/cards";

import { openPopup, closePopup, disableButton } from "./components/modal";

import { enableValidation } from "./components/validate";

import {
  //renderElement,
  //likeElement,
  //deleteElement,
  createCard,
  //viewCard,
} from "./components/card";

// 1 скрипт редактирования имени и рода занятий
buttonEdit.addEventListener("click", editInput);
function editInput() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  openPopup(popupEditProfile);
  disableButton(buttonSubmitEditProfile);
}
// Обработчик «отправки» формы
function saveEditInput(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
// Прикрепляем обработчик к форме
formEdit.addEventListener("submit", saveEditInput);

// добавим 6 мест при загрузке страницы
initialCards.forEach(function (card) {
  renderElement(card.name, card.link);
});

buttonAdd.addEventListener("click", function () {
  formAddCard.reset();
  openPopup(popupAddCard);
  disableButton(buttonSubmitAddCard);
});

formAddCard.addEventListener("submit", addNewCard);
function addNewCard(evt) {
  evt.preventDefault();
  renderElement(nameImagePopup.value, linkImagePopup.value);
  formAddCard.reset();
  closePopup(popupAddCard);
}

function renderElement(nameCard, linkCard) {
  const element = createCard(nameCard, linkCard);
  elementContainer.prepend(element);
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__submit_disabled",
});
