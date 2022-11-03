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
  disableSubmitButton,
  enableSubmitButton,
} from "./components/validate";

import {
  //renderElement,
  //likeElement,
  //deleteElement,
  createCard,
  //viewCard,
} from "./components/card";

// функция обновления фото пользователя
//function renderUserAvatar(avatar) {elementUserAvatar.style.backgroundImage = `url(${avatar})`; }
//buttonAvatar.addEventListener("click", () => {formChangeAvatar.reset(); disableSubmitButton(buttonSubmitChangeAvatar);   openPopup(popupChangeAvatar);});
//formChangeAvatar.addEventListener("submit", () => {renderUserAvatar(linkChangeAvatar.value);  closePopup(popupChangeAvatar); });

// 1 скрипт редактирования имени и рода занятий
buttonEdit.addEventListener("click", editInput);
// Получите значение полей jobInput и nameInput из свойства value
function editInput() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  openPopup(popupEditProfile);
  enableValidation(nameInput, jobInput);
  disableSubmitButton(buttonSubmitEditProfile);
}
// Обработчик «отправки» формы
function saveEditInput(evt) {
  evt.preventDefault();
  // Вставьте новые значения с помощью textContent
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
  disableSubmitButton(buttonSubmitAddCard);
  openPopup(popupAddCard);
});

formAddCard.addEventListener("submit", addNewCard);
// добавить место по данным формы
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
});
