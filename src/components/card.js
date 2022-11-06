import {
  elementTemplate,
  elementContainer,
  imageLookCloser,
  nameLookCloser,
  popupLookCloser,
} from "./utils";
import { openPopup } from "./modal";

export function createCard(
  card,
  userID,
  deleteElementHandler,
  likeTogglerHandler
) {
  const newElement = elementTemplate.cloneNode(true);
  const imageElement = newElement.querySelector(".element__image");
  const likesCounterElement = newElement.querySelector(
    ".element__like-counter"
  );
  const deleteButtonElement = newElement.querySelector(
    ".element__delete-button"
  );
  const likeButtonElement = newElement.querySelector(".element__like-button");
  newElement.querySelector(".element__title").textContent = card.name;
  imageElement.setAttribute("src", card.link);
  imageElement.setAttribute("alt", card.name);
  likesCounterElement.textContent = card.likes.length;
  elementContainer.prepend(newElement);

  imageElement.addEventListener("click", function () {
    imageLookCloser.setAttribute("src", card.link);
    imageLookCloser.setAttribute("alt", card.name);
    nameLookCloser.textContent = card.name;
    openPopup(popupLookCloser);
  });

  if (card.owner._id === userID) {
    deleteButtonElement.addEventListener("click", deleteElementHandler);
  } else {
    deleteButtonElement.remove();
  }
  if (likeElementUser(card.likes, userID)) {
    likeButtonElement.classList.add("element__like-button_active");
  }
  likeButtonElement.addEventListener("click", likeTogglerHandler);
}

//export function deleteElement(element) {  element.closest(".element").remove();}
function likeElementUser(likes, userID) {
  return likes.find((likesOwner) => likesOwner._id === userID) !== undefined;
}
export function isCardLikeButtonActive(element) {
  const buttonElement = element.querySelector(".element__like-button");
  return buttonElement.classList.contains("element__like-button_active");
}
export function changeLikeStatus(element, likes, userID) {
  const buttonElement = element.querySelector(".element__like-button");
  const сounterElement = element.querySelector(".element__like-counter");
  сounterElement.textContent = likes.length;
  if (likeElementUser(likes, userID)) {
    buttonElement.classList.add("element__like-button_active");
  } else {
    buttonElement.classList.remove("element__like-button_active");
  }
}
