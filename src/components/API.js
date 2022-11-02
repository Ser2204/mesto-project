const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-16",
  headers: {
    authorization: "703c9790-16d9-4dc9-84fc-515962733489",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Ошибка: ${res.status}`);
}

export function getCardsFromServer() {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function postNewCardToServer(name, link) {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

export function deleteCardFromServer(cardID) {
  return fetch(config.baseUrl + `/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function getUserInfoFromServer() {
  return fetch(config.baseUrl + "/users/me", {
    method: "get",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function postUserInfoToServer(name, about) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

export function changeUserAvatarOnServer(link) {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => checkResponse(res));
}

export function putLikeOnCard(cardID) {
  return fetch(config.baseUrl + `/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function deleteLikeFromCard(cardID) {
  return fetch(config.baseUrl + `/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}
