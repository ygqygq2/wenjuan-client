'use client';

import { Button, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, FC, useState } from 'react';

import { LOGIN_PATHNAME } from '@/app/config/constants';
import { getUserInfo } from '@/app/hooks/useGetUserInfo';
import useLoadUserData from '@/app/hooks/useLoadUserData';
import useNavPage from '@/app/hooks/useNavPage';
import { removeToken } from '@/app/services/client/user-token';
import useUserStore from '@/app/store/userStore';

const UserInfo: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
  });
  const { login, logout } = useUserStore();
  const { waitingUserData } = useLoadUserData(login);
  useNavPage(waitingUserData, userInfo.username);

  // 从 store 中拿 user 数据
  useEffect(() => {
    if (!waitingUserData) {
      const { username, nickname } = getUserInfo();
      setUserInfo({ username, nickname });
      setIsLogin(!!username);
    }
  }, [waitingUserData, pathname]);

  function handleLogout() {
    logout();
    removeToken();
    router.push(LOGIN_PATHNAME);
  }

  const UserInfoEl = (
    <div className="flex items-center justify-center ">
      <i className="iconfont">&#xe602;</i>
      <Spacer />
      <span style={{ color: '#e8e8e8' }}>{userInfo.nickname}</span>
      <Spacer />
      <Button color="secondary" onClick={handleLogout}>
        退出
      </Button>
    </div>
  );

  const Login = <Link href={LOGIN_PATHNAME}>登录</Link>;

  return <div>{isLogin ? UserInfoEl : Login}</div>;
};

export default UserInfo;
