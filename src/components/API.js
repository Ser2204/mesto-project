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

export function getElementServer() {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function postNewElementServer(name, link) {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

export function deleteElementServer(cardID) {
  return fetch(config.baseUrl + `/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function getUserInfoServer() {
  return fetch(config.baseUrl + "/users/me", {
    method: "get",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function postUserInfoServer(name, about) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

export function changeUserAvatarServer(link) {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => checkResponse(res));
}

export function putLikeElement(cardID) {
  return fetch(config.baseUrl + `/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export function deleteLikeElement(cardID) {
  return fetch(config.baseUrl + `/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}
