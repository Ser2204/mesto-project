import { profile, profileInfo, profileFoto } from "./components/utils";

export function editProfileFoto(avatar) {
  profileFoto.style.backgroundImage = `url(${avatar})`;
}
export function saveEditInput(name, about) {
  profile.textContent = name;
  profileInfo.textContent = about;
}
export function editInput() {
  const userInfo = {
    name: profile.textContent,
    about: profileInfo.textContent,
  };
  return userInfo;
}
