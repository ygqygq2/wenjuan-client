import { message } from 'antd';
import axios from 'axios';

import { isDev } from '../utils';

import { getToken } from './client/user-token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  timeout: 10 * 1000,
  withCredentials: !isDev(),
});

// request 拦截处理 token
instance.interceptors.request.use(
  // Adds an authorization header to all requests except those to /auth

  (config) => {
    // 客户端直接发起的请求，通过 localStorage 处理 token
    // 否则是 next 服务端发起的请求，通过 cookie 处理 token
    if (typeof localStorage !== 'undefined') {
      const token = getToken();
      if (token && config.url && !config.url.includes('/auth')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// response 拦截处理 errno 和 msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }

  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};

export async function get(url: string) {
  const data = await instance.get(`${url}`);
  return data;
}

export async function post(url: string, body: any) {
  const data = await instance.post(`${url}`, body);
  return data;
}
