'use client';

import { UserOutlined } from '@ant-design/icons';
import { Button, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { LOGIN_PATHNAME } from '@/app/config/constants';
import { useGetUserInfo } from '@/app/hooks/useGetUserInfo';
import useLoadUserData from '@/app/hooks/useLoadUserData';
import useNavPage from '@/app/hooks/useNavPage';
import { removeToken } from '@/app/services/client/user-token';
import useUserStore from '@/app/store/userStore';

const UserInfo: FC = () => {
  const router = useRouter();
  const { login, logout } = useUserStore();
  const { waitingUserData } = useLoadUserData(login);
  useNavPage(waitingUserData);

  // 从 store 中拿 user 数据
  const { username, nickname } = useGetUserInfo();

  function handleLogout() {
    logout();
    removeToken();
    router.push(LOGIN_PATHNAME);
  }

  const UserInfoEl = (
    <div className="flex items-center justify-center ">
      <UserOutlined></UserOutlined>
      <Spacer />
      <span style={{ color: '#e8e8e8' }}>{nickname}</span>
      <Spacer />
      <Button color="secondary" onClick={handleLogout}>
        退出
      </Button>
    </div>
  );

  const Login = <Link href={LOGIN_PATHNAME}>登录</Link>;

  return <div>{username ? UserInfoEl : Login}</div>;
};

export default UserInfo;
