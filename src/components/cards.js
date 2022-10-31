// 6 карточек из коробки
import {
  templateCard,
  containerCards,
  imageViewCard,
  placeNameViewCard,
  popupViewCard,
} from "./utils";
import { openPopup } from "./modal";

export function createCard(
  card,
  userID,
  deleteCardHandler,
  likeTogglerHandler
) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likesCounterElement = cardElement.querySelector(".card__like-counter");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  function viewCard() {
    imageViewCard.setAttribute("src", card.link);
    imageViewCard.setAttribute("alt", card.name);
    placeNameViewCard.textContent = card.name;
    openPopup(popupViewCard);
  }

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardElement.querySelector(".card__place-name").textContent = card.name;

  containerCards.prepend(cardElement);

  likesCounterElement.textContent = card.likes.length;

  if (card.owner._id === userID) {
    deleteCardButton.addEventListener("click", deleteCardHandler);
  } else {
    deleteCardButton.remove();
  }

  cardElement.querySelector(".card__image").addEventListener("click", viewCard);

  if (isCardLikedByUser(card.likes, userID)) {
    likeButton.classList.add("card__like-button_active");
  }

  likeButton.addEventListener("click", likeTogglerHandler);
}

export function deleteCardElement(cardElement) {
  cardElement.closest(".card").remove();
}

export function isCardLikedByUser(likes, userID) {
  return likes.find((likeOwner) => likeOwner._id === userID) !== undefined;
}

export function isCardLikeButtonActive(cardElement) {
  const button = cardElement.querySelector(".card__like-button");
  return button.classList.contains("card__like-button_active");
}

export function changeLikeStatus(cardElement, likes, userID) {
  const button = cardElement.querySelector(".card__like-button");
  const counter = cardElement.querySelector(".card__like-counter");
  counter.textContent = likes.length;
  if (isCardLikedByUser(likes, userID)) {
    button.classList.add("card__like-button_active");
  } else {
    button.classList.remove("card__like-button_active");
  }
}
