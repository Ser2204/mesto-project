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
  buttonSubmitChangeAvatar,
  popupChangeAvatar,
  formChangeAvatar,
  linkChangeAvatar,
  elementUserAvatar,
  buttonSubmitAddCard,
  buttonSubmitEditProfile,
  elementContainer,
} from "./components/utils";

import { openPopup, closePopup } from "./components/modal";

import {
  enableValidation,
  configValidate,
  disableSubmitButton,
} from "./components/validate";

import {
  createCard,
  changeLikeStatus,
  isCardLikeButtonActive,
} from "./components/card";

import {
  getInitialCards,
  postElementServer,
  getUserInfoServer,
  postUserInfoServer,
  deleteElementServer,
  changeAvatarServer,
  putLikeElementServer,
  deleteLikeElementServer,
} from "./components/api";

let userID = "";
const cardsArray = [];
enableValidation({
  configValidate,
});

// функция обновления фото пользователя
function renderUserAvatar(avatar) {
  elementUserAvatar.style.backgroundImage = `url(${avatar})`;
}
buttonAvatar.addEventListener("click", () => {
  formChangeAvatar.reset();
  disableSubmitButton(buttonSubmitChangeAvatar);
  openPopup(popupChangeAvatar);
});
formChangeAvatar.addEventListener("submit", () => {
  const initialText = buttonSubmitChangeAvatar.textContent;
  buttonSubmitChangeAvatar.textContent = "Сохранение...";
  changeAvatarServer(linkChangeAvatar.value)
    .then(() => {
      closePopup(popupChangeAvatar);
      renderUserAvatar(linkChangeAvatar.value);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitChangeAvatar.textContent = initialText;
    });
});

buttonEdit.addEventListener("click", editInput);
function editInput() {
  const userInfo = { name: nameTitle.textContent, about: jobTitle.textContent };
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  openPopup(popupEditProfile);
  disableSubmitButton(buttonSubmitEditProfile, configValidate);
  //disableButton(buttonSubmitEditProfile);
}
function renderUserInfo(name, about) {
  nameTitle.textContent = name;
  jobTitle.textContent = about;
}
// Обработчик «отправки» формы
function saveEditInput(evt) {
  evt.preventDefault();
  const initialText = buttonSubmitEditProfile.textContent;
  buttonSubmitEditProfile.textContent = "Сохранение...";
  postUserInfoServer(nameInput.value, jobInput.value)
    .then(() => {
      renderUserInfo(nameInput.value, jobInput.value);
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitEditProfile.textContent = initialText;
    });
}
formEdit.addEventListener("submit", saveEditInput);

buttonAdd.addEventListener("click", function () {
  formAddCard.reset();
  openPopup(popupAddCard);
  disableSubmitButton(buttonSubmitAddCard, configValidate);
  //disableButton(buttonSubmitAddCard);
});

formAddCard.addEventListener("submit", addNewCard);
function addNewCard(evt) {
  evt.preventDefault();
  const initialText = buttonSubmitAddCard.textContent;
  buttonSubmitAddCard.textContent = "Сохранение...";

  postElementServer(nameImagePopup.value, linkImagePopup.value)
    .then((card) => {
      createCard(
        card,
        userID,
        deleteElementHandler(card._id),
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
}

function renderPage() {
  Promise.all([getUserInfoServer(), getInitialCards()])
    .then((result) => {
      const user = result[0];
      userID = user._id;
      renderUserInfo(user.name, user.about);
      renderUserAvatar(user.avatar);
      const cards = result[1];
      renderElement(cards);
      cards.forEach((card) => {
        cardsArray.push(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderElement(cardsArray) {
  cardsArray.reverse().forEach((card) => {
    createCard(
      card,
      userID,
      deleteElementHandler(card._id),
      handleClickLike(card)
    );
  });
}

window.addEventListener("DOMContentLoaded", renderPage);

function deleteElementHandler(cardID) {
  return (evt) => {
    const element = evt.target.closest(".element");
    deleteElementServer(cardID)
      .then(() => {
        element.closest(".element").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function handleClickLike(card) {
  return (evt) => {
    const element = evt.target.closest(".element");
    if (isCardLikeButtonActive(element)) {
      deleteLikeElementServer(card._id)
        .then((res) => {
          console.log(res);
          changeLikeStatus(element, res.likes, userID);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLikeElementServer(card._id)
        .then((res) => {
          console.log(res);
          changeLikeStatus(element, res.likes, userID);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}
