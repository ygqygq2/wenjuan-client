import axios, { AxiosInstance } from 'axios';

import { getToken } from './client/user-token';

export const createInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    timeout: 10 * 1000,
    withCredentials: true,
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

      // 判断是否存在 cookie
      if (typeof document !== 'undefined' && document.cookie) {
        config.headers.Cookie = document.cookie;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // response 拦截处理 errno 和 msg
  instance.interceptors.response.use(
    (res) => {
      const resData = (res.data || {}) as ResType;
      const { errno, data, msg } = resData;
      if (errno !== 0) {
        if (msg) {
          console.error(msg);
        }

        throw new Error(msg);
      }

      return data as any;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

const publicInstance = createInstance();

export default publicInstance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};

export async function get(url: string, token: string = '', params = {}, usePublicInstance = false) {
  const instance = usePublicInstance ? publicInstance : createInstance();
  if (token) {
    instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
  }
  const data = await instance.get(`${url}`, params);
  return data;
}

export async function post(url: string, body: any, token: string = '', usePublicInstance = false) {
  const instance = usePublicInstance ? publicInstance : createInstance();
  if (token) {
    instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
  }
  const data = await instance.post(`${url}`, body);
  return data;
}
