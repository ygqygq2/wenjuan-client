'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { LOGIN_PATHNAME, ANSWER_INDEX_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME } from '@/app/config/constants';

import { UserStateType } from '../store';

function useNavPage(userInfo: UserStateType) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (userInfo.waitingUserData && userInfo.isLogin) return;

    // 已经登录
    if (userInfo.isLogin) {
      if (isLoginOrRegister(pathname)) {
        const url = `${ANSWER_INDEX_PATHNAME}?${searchParams}`;
        router.push(url); // 跳转页面
        return;
      }
      return;
    }

    // 未登录
    const isMatch = isNoNeedUserInfo(pathname);
    if (isMatch) {
      // console.log('不需要用户信息');
      // 什么都不干
    } else {
      window.location.href = LOGIN_PATHNAME;
      // router.push(LOGIN_PATHNAME);
    }
  }, [userInfo, pathname, searchParams, router]);
}

export default useNavPage;

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}

// 判断是否需要用户信息，不需要用户信息的页面有：首页、登录页、注册页
export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}
