import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { LOGIN_PATHNAME, ANSWER_INDEX_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME } from '@/app/config/constants';

import { useGetUserInfo } from './useGetUserInfo';

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (waitingUserData) return;

    // 已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        router.push(ANSWER_INDEX_PATHNAME); // 跳转页面
      }
      return;
    }

    // 未登录
    const isMatch = isNoNeedUserInfo(pathname);
    if (isMatch) {
      // console.log('不需要用户信息');
      // 什么都不干
    } else {
      router.push(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname, router]);
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
