import "./index.css";
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
  renderLoading,
  returnRenderLoading,
} from "../components/utils";

import { openPopup, closePopup } from "../components/modal";

import {
  enableValidation,
  configValidate,
  disableSubmitButton,
} from "../components/validate";

import {
  createCard,
  changeLikeStatus,
  isCardLikeButtonActive,
} from "../components/card";

import {
  getInitialCards,
  postElementServer,
  getUserInfoServer,
  postUserInfoServer,
  deleteElementServer,
  changeAvatarServer,
  putLikeElementServer,
  deleteLikeElementServer,
} from "../components/api";

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
  disableSubmitButton(buttonSubmitChangeAvatar, configValidate);
  openPopup(popupChangeAvatar);
});
formChangeAvatar.addEventListener("submit", () => {
  renderLoading(buttonSubmitChangeAvatar);
  //const initialText = buttonSubmitChangeAvatar.textContent;   buttonSubmitChangeAvatar.textContent = "Сохранение...";
  changeAvatarServer(linkChangeAvatar.value)
    .then(() => {
      closePopup(popupChangeAvatar);
      renderUserAvatar(linkChangeAvatar.value);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      returnRenderLoading(buttonSubmitChangeAvatar);
    });
});

buttonEdit.addEventListener("click", openEditProfilePopup);
function openEditProfilePopup() {
  const userInfo = { name: nameTitle.textContent, about: jobTitle.textContent };
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  openPopup(popupEditProfile);
  disableSubmitButton(buttonSubmitEditProfile, configValidate);
}
function renderUserInfo(name, about) {
  nameTitle.textContent = name;
  jobTitle.textContent = about;
}
// Обработчик «отправки» формы
function submitEditProfileForm(evt) {
  evt.preventDefault();
  renderLoading(buttonSubmitEditProfile);
  postUserInfoServer(nameInput.value, jobInput.value)
    .then(() => {
      renderUserInfo(nameInput.value, jobInput.value);
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      returnRenderLoading(buttonSubmitEditProfile);
    });
}
formEdit.addEventListener("submit", submitEditProfileForm);

buttonAdd.addEventListener("click", function () {
  formAddCard.reset();
  openPopup(popupAddCard);
  disableSubmitButton(buttonSubmitAddCard, configValidate);
});

formAddCard.addEventListener("submit", addNewCard);
function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(buttonSubmitAddCard);

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
      returnRenderLoading(buttonSubmitAddCard);
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
      //cards.forEach((card) => {        cardsArray.push(card);      });
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
