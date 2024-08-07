import { jwtDecode } from 'jwt-decode';

import axios, { ResDataType } from '../ajax';
import { getToken } from './user-token';

/**
 * 获取用户信息
 * @returns
 */
export async function getUserInfoService(): Promise<ResDataType> {
  // 首先判断是否登录
  const token = getToken();
  if (!token) {
    // 用户未登录，返回异常
    return {
      errno: 0,
      msg: '用户未登录',
    };
  }
  const decodedToken: { sub: string; username: string } = jwtDecode(token);
  const id = decodedToken.sub;
  const { username } = decodedToken;
  const url = '/api/user/profile';
  const data = (await axios.get(url, {
    params: {
      id,
      username,
    },
  })) as ResDataType;
  return data;
}

/**
 * 注册用户
 * @param username
 * @param password
 * @param nickname
 * @returns
 */
export async function registerService(username: string, password: string, nickname: string): Promise<ResDataType> {
  const url = '/api/auth/register';
  const body = { username, password, nickname: nickname || username };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}

/**
 * 登录
 * @param username
 * @param password
 * @returns
 */
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/auth/login';
  const body = { username, password };
  const data = (await axios.post(url, body)) as ResDataType;
  return data; // {token: 'xxxxxxxx'}
}
