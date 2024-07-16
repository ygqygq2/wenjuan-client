import { jwtDecode } from 'jwt-decode';

import { USER_TOKEN_KEY } from '@/app/config/constants';

let localStorageAvailable = false;

if (typeof window !== 'undefined') {
  localStorageAvailable = true;
}

export function setToken(token: string) {
  if (localStorageAvailable) {
    localStorage.setItem(USER_TOKEN_KEY, token);
  }
}

export function getToken() {
  if (localStorageAvailable) {
    return localStorage.getItem(USER_TOKEN_KEY) || '';
  }
  return '';
}

export function removeToken() {
  if (localStorageAvailable) {
    localStorage.removeItem(USER_TOKEN_KEY);
  }
}

export function isTokenExpired(token: string) {
  if (!token) {
    return true; // 令牌为空，表示已过期
  }
  const decodedToken = jwtDecode<DecodedToken>(token);
  const expirationTime = decodedToken.exp * 1000; // 将过期时间转换为毫秒

  return Date.now() > expirationTime; // 检查当前时间是否晚于过期时间
}
