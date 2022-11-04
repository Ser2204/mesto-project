if (isCardLikedByUser(card.likes, userID)) {
  likeButton.classList.add("card__like-button_active");
}
likeButton.addEventListener("click", likeTogglerHandler);
function isCardLikedByUser(likes, userID) {
  return likes.find((likeOwner) => likeOwner._id === userID) !== undefined;
}

function isCardLikeButtonActive(cardElement) {
  const button = cardElement.querySelector(".card__like-button");
  return button.classList.contains("card__like-button_active");
}

function changeLikeStatus(cardElement, likes, userID) {
  const button = cardElement.querySelector(".card__like-button");
  const counter = cardElement.querySelector(".card__like-counter");
  counter.textContent = likes.length;
  if (isCardLikedByUser(likes, userID)) {
    button.classList.add("card__like-button_active");
  } else {
    button.classList.remove("card__like-button_active");
  }
}
