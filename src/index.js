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

import { openPopup, closePopup } from "./components/modal";

import {
  enableValidation,
  configValidate,
  disableSubmitButton,
} from "./components/validate";

import { createCard } from "./components/card";

// 1 скрипт редактирования имени и рода занятий
buttonEdit.addEventListener("click", editInput);
function editInput() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  openPopup(popupEditProfile);
  disableSubmitButton(buttonSubmitEditProfile, configValidate);
  //disableButton(buttonSubmitEditProfile);
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
  disableSubmitButton(buttonSubmitAddCard, configValidate);
  //disableButton(buttonSubmitAddCard);
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
  configValidate,
});
