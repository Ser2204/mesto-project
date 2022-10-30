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
} from "./components/utils";

import { initialCards } from "./components/card";

import {
  openPopup,
  closePopup,
  disableSubmitButton,
  enableSubmitButton,
} from "./components/modal";

import { enableValidation } from "./components/validate";

function renderUserAvatar(avatar) {
  elementUserAvatar.style.backgroundImage = `url(${avatar})`;
}

buttonAvatar.addEventListener("click", () => {
  formChangeAvatar.reset();
  disableSubmitButton(buttonSubmitChangeAvatar);
  openPopup(popupChangeAvatar);
});

formChangeAvatar.addEventListener("submit", () => {
  renderUserAvatar(linkChangeAvatar.value);
  closePopup(popupChangeAvatar);
});

// 1 скрипт редактирования имени и рода занятий
buttonEdit.addEventListener("click", editInput);
// Получите значение полей jobInput и nameInput из свойства value
function editInput() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  openPopup(popupEditProfile);
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

// 5 скрипт переключатель нравится / не нравится
function likeElement(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

// 6 удаление карточки
function deleteElement(evt) {
  evt.target.closest(".element").remove();
}

// добавим 6 мест при загрузке страницы
initialCards.forEach(function (card) {
  renderElement(card.name, card.link);
});

buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard);
});
//добавить место, на входе данные из массива или с формы
function createCard(nameCard, linkCard) {
  const newElement = elementTemplate.cloneNode(true);
  const elementImage = newElement.querySelector(".element__image");
  newElement.querySelector(".element__title").textContent = nameCard;
  elementImage.src = linkCard;
  elementImage.alt = nameCard;
  //открытие попапа с картинкой
  elementImage.addEventListener("click", function () {
    imageLookCloser.src = linkCard;
    imageLookCloser.alt = nameCard;
    nameLookCloser.textContent = nameCard;
    openPopup(popupLookCloser);
  });
  newElement
    .querySelector(".element__like-button")
    .addEventListener("click", likeElement);
  newElement
    .querySelector(".element__delete-button")
    .addEventListener("click", deleteElement);
  return newElement;
}

// опубликовать новую карточку
function renderElement(nameCard, linkCard) {
  const element = createCard(nameCard, linkCard);
  elementContainer.prepend(element);
}

// добавить место по данным формы
function addNewCard(evt) {
  evt.preventDefault();
  renderElement(nameImagePopup.value, linkImagePopup.value);
  formAddCard.reset();
  closePopup(popupAddCard);
}

formAddCard.addEventListener("submit", addNewCard);

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
