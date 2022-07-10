// переменные profile
const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");
const buttonCloseEdit = document.querySelector("#closeEdit");
const popupEditProfile = document.querySelector("#editProfile");
//const submitEditProfile = document.querySelector("#submitEditProfile");

// Находим переменные для обновления Имени и Рода занятий
const formEdit = document.querySelector("#formEdit");
//const submit = document.querySelector("#submitEditProfile");
const nameInput = formEdit.querySelector("#heading");
const jobInput = formEdit.querySelector("#subheading");
const nameTitle = profile.querySelector(".profile__title");
const jobTitle = profile.querySelector(".profile__subtitle");

// переменные addCard
const popupAddCard = document.querySelector("#addCard");
const buttonDelete = document.querySelector(".element__delete-button");
//const submitAddCard = popupAddCard.querySelector("#submitAddCard");
const buttonCloseAdd = document.querySelector("#closeAddCard");
const formAddCard = document.querySelector("#newCard");
const nameImagePopup = formAddCard.querySelector("#nameImage");
const linkImagePopup = formAddCard.querySelector("#linkImage");

const elementContainer = document.querySelector(".elements"); // куда вставлять
const elementTemplate = document.querySelector("#element").content; // содержимое шаблона

// popup look-closer
const popupLookCloser = document.querySelector(".popup_type_look-closer");
const buttonLookCloser = popupLookCloser.querySelector(
  ".popup__close_look-closer"
);
const imageLookCloser = popupLookCloser.querySelector(
  ".popup__look-closer-image"
);
const nameLookCloser = popupLookCloser.querySelector(
  ".popup__look-closer-name"
);
const buttonCloseLook = popupLookCloser.querySelector(
  "#popup__close_look-closer"
);

// !! функции popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// !!. действия по кликам
// открыть попап
buttonEdit.addEventListener("click", editInput);
//function () {
//  openPopup(popupEditProfile); //popupEditProfile.classList.add("popup_opened");
//});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard); //popupAddCard.classList.add("popup_opened");
});

// закрыть попап editProfile
//submitEditProfile.addEventListener("click", function () {
//  closePopup(popupEditProfile); //popupEditProfile.classList.remove("popup_opened");
//});
buttonCloseEdit.addEventListener("click", function () {
  closePopup(popupEditProfile); //popupEditProfile.classList.remove("popup_opened");
});
//закрыть попап addCard
//submitAddCard.addEventListener("click", function () {
//  closePopup(popupAddCard); //  popupAddCard.classList.remove("popup_opened");
//});
buttonCloseAdd.addEventListener("click", function () {
  closePopup(popupAddCard); //popupEditProfile.classList.remove("popup_opened");
});
//закрыть попап lookCloser
buttonCloseLook.addEventListener("click", function () {
  closePopup(popupLookCloser);
});

// 1 скрипт редактирования имени и рода занятий
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

//добавить место, на входе данные из массива или с формы
function createCard(nameCard, linkCard) {
  const newElement = elementTemplate.cloneNode(true);
  const elementImage = newElement.querySelector(".element__image");
  newElement.querySelector(".element__title").textContent = nameCard;
  elementImage.src = linkCard;
  elementImage.alt = nameCard;

  // 7 открытие попапа с картинкой
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

console.log(linkImagePopup.value);

formAddCard.addEventListener("submit", addNewCard);
