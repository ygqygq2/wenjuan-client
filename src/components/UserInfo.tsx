'use client';

import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { LOGIN_PATHNAME } from '@/app/config/constants';
import { useGetUserInfo } from '@/app/hooks/useGetUserInfo';
import { removeToken } from '@/app/services/client/user-token';
import useUserStore from '@/app/store/userStore';

const UserInfo: FC = () => {
  const router = useRouter();
  const { logout } = useUserStore();

  const { username, nickname } = useGetUserInfo();

  function handleLogout() {
    logout();
    removeToken();
    message.success('退出成功');
    router.push(LOGIN_PATHNAME);
  }

  const UserInfoEl = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
      </span>
      <Button type="link" onClick={handleLogout}>
        退出
      </Button>
    </>
  );

  const Login = <Link href={LOGIN_PATHNAME}>登录</Link>;

  return <div>{username ? UserInfoEl : Login}</div>;
};

export default UserInfo;
