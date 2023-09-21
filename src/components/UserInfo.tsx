'use client';

import { Button, Spacer } from '@nextui-org/react';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';

import { LOGIN_PATHNAME } from '@/app/config/constants';
import { useGetUserInfo } from '@/app/hooks/useGetUserInfo';
import useNavPage from '@/app/hooks/useNavPage';
import { ResDataType, get } from '@/app/services/ajax';
import { getToken, removeToken } from '@/app/services/client/user-token';
import useUserStore from '@/app/store/userStore';

const UserInfo: FC = () => {
  const router = useRouter();
  const { login, logout } = useUserStore();

  const userInfo = useGetUserInfo();
  useNavPage(userInfo);

  useEffect(() => {
    const token = getToken();

    // eslint-disable-next-line @typescript-eslint/no-shadow
    async function getData(token: string) {
      if (!token) return;
      const decodedToken = jwt_decode<DecodedToken>(token);
      const id = decodedToken.sub;
      const { username } = decodedToken;
      const url = `/api/user/profile?id=${id}&username=${username}`;
      const data = (await get(url)) as ResDataType;
      if (data.username) {
        login({
          username: data?.username,
          nickname: data?.profile?.nickname,
          isLogin: true,
          waitingUserData: false,
        });
      } else {
        login({
          username: '',
          nickname: '',
          isLogin: false,
          waitingUserData: false,
        });
      }
    }

    getData(token);
  }, []);

  function handleLogout() {
    logout();
    removeToken();
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push(LOGIN_PATHNAME);
  }

  const UserInfoEl = (
    <div className="flex items-center justify-center text-sm">
      <i className="iconfont ">&#xe602;</i>
      <Spacer />
      <span className="text-[#e8e8e8]">{userInfo.nickname}</span>
      <Spacer />
      <Button color="secondary" onClick={handleLogout}>
        退出
      </Button>
    </div>
  );

  const Login = <Link href={LOGIN_PATHNAME}>登录</Link>;

  return <div>{userInfo.isLogin ? UserInfoEl : Login}</div>;
};

export default UserInfo;
