import { create } from 'zustand';

// import {setUserInfo} from '@/app/services/client/user-info';

import { getToken, getUserInfoService, isTokenExpired } from '../services/client';

export type UserStateType = {
  username: string;
  nickname: string;
  waitingUserData: boolean;
  isLogin: boolean;
};

export type UserStoreType = {
  userState: UserStateType;
  login: (user: UserStateType) => void;
  logout: () => void;
  fetchUserData: () => void;
};

const INIT_STATE: UserStateType = { username: '', nickname: '', waitingUserData: true, isLogin: false };

const useUserStore = create<UserStoreType>((set) => {
  // 检查 localStorage 中的 JWT 令牌
  const token = getToken();
  const isTokenValid = !isTokenExpired(token);

  // 根据 JWT 令牌的存在与否设置初始状态
  const initialState: UserStateType = {
    ...INIT_STATE,
    isLogin: isTokenValid,
  };

  return {
    userState: initialState,
    login: (user: UserStateType) => {
      set({ userState: user });
    },
    logout: () => set({ userState: INIT_STATE }),
    fetchUserData: async () => {
      try {
        const result = await getUserInfoService();
        const { username } = result;
        if (username) {
          const nickname = result?.profile?.nickname || username;
          set({
            userState: {
              username,
              nickname,
              waitingUserData: false,
              isLogin: true,
            },
          });
          // setUserInfo({
          //   username,
          //   nickname,
          //   waitingUserData: false,
          //   isLogin: true,
          // });
        } else {
          set({
            userState: {
              ...INIT_STATE,
              waitingUserData: false,
              isLogin: false,
            },
          });
          // setUserInfo({
          //   ...INIT_STATE,
          //   waitingUserData: false,
          //   isLogin: false,
          // });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },
  };
});

export default useUserStore;
