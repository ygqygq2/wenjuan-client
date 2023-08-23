import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

import { getUserInfoService } from '../services/client';

import { UserStateType } from '../store';

import { useGetUserInfo } from './useGetUserInfo';

function useLoadUserData(login: (user: UserStateType) => void) {
  const [waitingUserData, setWaitingUserData] = useState(true);

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username } = result;
      const nickname = result?.profile?.nickname || username;
      // 存储到 store 中
      login({ username, nickname });
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 从 redux store 中获取用户信息
  const { username, nickname } = useGetUserInfo();

  // 判断是否已经存在用户信息（获取过）
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
    }
    run(); // 如果 username 不存在，就获取用户信息
  }, [username, nickname, run]);
  return { waitingUserData };
}

export default useLoadUserData;
