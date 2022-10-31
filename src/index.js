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
} from "./components/utils";

import { initialCards } from "./components/cards";

import {
  openPopup,
  closePopup,
  disableSubmitButton,
  enableSubmitButton,
} from "./components/modal";

import { enableValidation } from "./components/validate";

import { editProfileFoto, editInput, saveEditInput } from "./components/user";

import {
  getUserInfoFromServer,
  postUserInfoToServer,
  getCardsFromServer,
  deleteCardFromServer,
  postNewCardToServer,
  putLikeOnCard,
  deleteLikeFromCard,
  changeUserAvatarOnServer,
} from "./scripts/api";

buttonAvatar.addEventListener("click", () => {
  formChangeAvatar.reset();
  disableSubmitButton(buttonSubmitChangeAvatar);
  openPopup(popupChangeAvatar);
});

formChangeAvatar.addEventListener("submit", () => {
  editProfileFoto(linkChangeAvatar.value);
  closePopup(popupChangeAvatar);
});

// Получите значение полей jobInput и nameInput из свойства value
//function editInput() {
//  nameInput.value = nameTitle.textContent;
//  jobInput.value = jobTitle.textContent;
//  openPopup(popupEditProfile);}

// Обработчик «отправки» формы
//function saveEditInput(evt) {
//  evt.preventDefault();
// Вставьте новые значения с помощью textContent
//  nameTitle.textContent = nameInput.value;
//  jobTitle.textContent = jobInput.value;
//  closePopup(popupEditProfile);}

// 1 скрипт редактирования имени и рода занятий
buttonEdit.addEventListener("click", editInput);

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

/////заготовки кода
let userID = "";
const cardsArray = [];

function renderPage() {
  Promise.all([getUserInfoFromServer(), getCardsFromServer()])
    .then((result) => {
      const user = result[0];
      userID = user._id;
      renderUserInfo(user.name, user.about);
      renderUserAvatar(user.avatar);
      const cards = result[1];
      renderCards(cards);
      cards.forEach((card) => {
        cardsArray.push(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderCards(cardsArray) {
  cardsArray.reverse().forEach((card) => {
    createCard(
      card,
      userID,
      deleteCardHandler(card._id),
      handleClickLike(card)
    );
  });
}

window.addEventListener("DOMContentLoaded", renderPage);

const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__exit-button");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

buttonOpenEditProfile.addEventListener("click", function () {
  const userInfo = getUserInfoFromPage();
  inputUserName.value = userInfo.name;
  inputUserDescription.value = userInfo.about;
  enableSubmitButton(buttonSubmitEditProfile);
  openPopup(popupEditProfile);
});

formEditProfile.addEventListener("submit", function () {
  const initialText = buttonSubmitEditProfile.textContent;
  buttonSubmitEditProfile.textContent = "Сохранение...";
  postUserInfoToServer(inputUserName.value, inputUserDescription.value)
    .then(() => {
      closePopup(popupEditProfile);
      renderUserInfo(inputUserName.value, inputUserDescription.value);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitEditProfile.textContent = initialText;
    });
});

buttonOpenChangeAvatar.addEventListener("click", () => {
  formChangeAvatar.reset();
  disableSubmitButton(buttonSubmitChangeAvatar);
  openPopup(popupChangeAvatar);
});

formChangeAvatar.addEventListener("submit", () => {
  const initialText = buttonSubmitChangeAvatar.textContent;
  buttonSubmitChangeAvatar.textContent = "Сохранение...";
  changeUserAvatarOnServer(inputAvatarLink.value)
    .then(() => {
      closePopup(popupChangeAvatar);
      renderUserAvatar(inputAvatarLink.value);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitChangeAvatar.textContent = initialText;
    });
});

buttonOpenAddCard.addEventListener("click", function () {
  formAddCard.reset();
  disableSubmitButton(buttonSubmitAddCard);
  openPopup(popupAddCard);
});

formAddCard.addEventListener("submit", function () {
  const initialText = buttonSubmitAddCard.textContent;
  buttonSubmitAddCard.textContent = "Сохранение...";
  postNewCardToServer(inputPlaceName.value, inputPlaceLink.value)
    .then((card) => {
      createCard(
        card,
        userID,
        deleteCardHandler(card._id),
        handleClickLike(card)
      );
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitAddCard.textContent = initialText;
    });
});

function deleteCardHandler(cardID) {
  return (evt) => {
    const cardElement = evt.target.closest(".card");
    deleteCardFromServer(cardID)
      .then(() => {
        deleteCardElement(cardElement);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function handleClickLike(card) {
  return (evt) => {
    const cardElement = evt.target.closest(".card");
    if (isCardLikeButtonActive(cardElement)) {
      deleteLikeFromCard(card._id)
        .then((res) => {
          console.log(res);
          changeLikeStatus(cardElement, res.likes, userID);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLikeOnCard(card._id)
        .then((res) => {
          console.log(res);
          changeLikeStatus(cardElement, res.likes, userID);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}
