import {
  elementTemplate,
  elementContainer,
  imageLookCloser,
  nameLookCloser,
  popupLookCloser,
  nameImagePopup,
  linkImagePopup,
  formAddCard,
  popupAddCard,
} from "./utils";
import { openPopup, closePopup } from "./modal";

export function createCard(nameCard, linkCard) {
  const newElement = elementTemplate.cloneNode(true);
  const imageElement = newElement.querySelector(".element__image");
  //const likesCounterElement = newElement.querySelector(".element__like-counter");
  const deleteButtonElement = newElement.querySelector(
    ".element__delete-button"
  );
  const likeButtonElement = newElement.querySelector(".element__like-button");
  newElement.querySelector(".element__title").textContent = nameCard;
  imageElement.src = linkCard;
  imageElement.alt = nameCard;

  imageElement.addEventListener("click", function () {
    imageLookCloser.src = linkCard;
    imageLookCloser.alt = nameCard;
    nameLookCloser.textContent = nameCard;
    openPopup(popupLookCloser);
  });
  likeButtonElement.addEventListener("click", likeElement);
  deleteButtonElement.addEventListener("click", deleteElement);

  return newElement;
}

// 5 скрипт переключатель нравится / не нравится
function deleteElement(evt) {
  evt.target.closest(".element").remove();
}
// 6 удаление карточки
function likeElement(evt) {
  evt.target.classList.toggle("element__like-button_active");
}
// опубликовать новую карточку
export function renderElement(nameCard, linkCard) {
  const element = createCard(nameCard, linkCard);
  elementContainer.prepend(element);
}
