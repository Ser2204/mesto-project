// 6 карточек из коробки
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// переменные profile
const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");
const buttonCloseEdit = document.querySelector("#closeEdit");
const editProfilePopup = document.querySelector("#editProfile");
const submitEditProfile = document.querySelector("#submitEditProfile");

// Находим переменные для обновления Имени и Рода занятий
const formEdit = document.querySelector("#formEdit");
const submit = document.querySelector(".form__submit");
let nameInput = formEdit.querySelector("#heading");
let jobInput = formEdit.querySelector("#subheading");
let nameTitle = profile.querySelector(".profile__title");
let jobTitle = profile.querySelector(".profile__subtitle");

// переменные addCard
const addCardPopup = document.querySelector("#addCard");
const buttonDelete = document.querySelector(".element__delete-button");
const submitAddCard = addCardPopup.querySelector("#submitAddCard");
const buttonCloseAdd = document.querySelector("#closeAddCard");
const formAddCard = document.querySelector("#newCard");
let nameImagePopup = formAddCard.querySelector("#nameImage");
let linkImagePopup = formAddCard.querySelector("#linkImage");

const elementContainer = document.querySelector(".elements"); // куда вставлять
const elementTemplate = document.querySelector("#element").content; // содержимое шаблона

// popup look-closer
const lookCloser = document.querySelector(".popup_look-closer");
const buttonLookCloser = lookCloser.querySelector(".popup__close_look-closer");
const lookCloserImage = lookCloser.querySelector(".popup__look-closer-image");
const lookCloserName = lookCloser.querySelector(".popup__look-closer-name");
const buttonCloseLook = lookCloser.querySelector("#popup__close_look-closer");

// !! функции popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// !!. действия по кликам
// открыть попап
buttonEdit.addEventListener("click", function () {
  openPopup(editProfilePopup); //editProfilePopup.classList.add("popup_opened");
});
buttonAdd.addEventListener("click", function () {
  openPopup(addCardPopup); //addCardPopup.classList.add("popup_opened");
});

// закрыть попап editProfile
//submitEditProfile.addEventListener("click", function () {
//  closePopup(editProfilePopup); //editProfilePopup.classList.remove("popup_opened");
//});
buttonCloseEdit.addEventListener("click", function () {
  closePopup(editProfilePopup); //editProfilePopup.classList.remove("popup_opened");
});
//закрыть попап addCard
submitAddCard.addEventListener("click", function () {
  closePopup(addCardPopup); //  addCardPopup.classList.remove("popup_opened");
});
buttonCloseAdd.addEventListener("click", function () {
  closePopup(addCardPopup); //editProfilePopup.classList.remove("popup_opened");
});
//закрыть попап lookCloser
buttonCloseLook.addEventListener("click", function () {
  closePopup(lookCloser);
});

// 1 скрипт редактирования имени и рода занятий
// Получите значение полей jobInput и nameInput из свойства value
function editInput() {
  nameInput.value = nameInput.textContent;
  jobInput.value = jobInput.textContent;
}
// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Вставьте новые значения с помощью textContent
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  closePopup(editProfilePopup);
}
// Прикрепляем обработчик к форме
formEdit.addEventListener("submit", formSubmitHandler);

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
    lookCloserImage.src = linkCard;
    lookCloserImage.alt = nameCard;
    lookCloserName.textContent = nameCard;

    openPopup(lookCloser);
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
  closePopup(addCardPopup);
}

console.log(linkImagePopup.value);

formAddCard.addEventListener("submit", addNewCard);
