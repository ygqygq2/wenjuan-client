'use client';

import useUserStore, { UserStoreType, UserStateType } from '@/app/store';

export const useGetUserInfo = (): UserStateType => {
  const userState = useUserStore((state: UserStoreType) => state.userState);
  return userState;
};
