'use client';

import { message } from 'antd';
import axios from 'axios';

import { getToken } from './client/user-token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10 * 1000,
  withCredentials: process.env.NODE_ENV !== 'development',
});

// request 拦截处理 token
instance.interceptors.request.use(
  // Adds an authorization header to all requests except those to /auth

  (config) => {
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
  const res = await instance.get(`${url}`);
  const { data } = res;
  return data;
}

export async function post(url: string, body: any) {
  const res = await instance.post(`${url}`, body);
  const { data } = res;
  return data;
}
