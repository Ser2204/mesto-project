import "./index.css";
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
import {
  renderUserInfo,
  renderUserAvatar,
  getUserInfoFromPage,
} from "./scripts/userInfo";
import {
  deleteCardElement,
  isCardLikedByUser,
  changeLikeStatus,
  isCardLikeButtonActive,
  createCard,
} from "./scripts/card";
import {
  disableSubmitButton,
  enableSubmitButton,
  openPopup,
  closePopup,
} from "./scripts/modal";
import { enableValidation } from "./scripts/validation";
import {
  popupChangeAvatar,
  popupEditProfile,
  popupAddCard,
  popupViewCard,
  formEditProfile,
  formChangeAvatar,
  formAddCard,
  buttonOpenEditProfile,
  buttonOpenChangeAvatar,
  buttonOpenAddCard,
  buttonSubmitEditProfile,
  buttonSubmitChangeAvatar,
  buttonSubmitAddCard,
  inputUserName,
  inputUserDescription,
  inputAvatarLink,
  inputPlaceName,
  inputPlaceLink,
  placeNameViewCard,
  imageViewCard,
} from "./scripts/utils";

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

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

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
