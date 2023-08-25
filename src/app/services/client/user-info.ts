import { USER } from '@/app/config/constants';
import { UserStateType } from '@/app/store';

export function setUserInfo(userInfo: UserStateType) {
  localStorage.setItem(USER, JSON.stringify(userInfo));
}

export function getUserInfo() {
  const userInfoString = localStorage.getItem(USER);
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    return userInfo;
  }
  return null;
}

export function removeUserInfo() {
  localStorage.removeItem(USER);
}
