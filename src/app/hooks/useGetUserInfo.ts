import useUserStore, { UserStoreType, UserStateType } from '@/app/store';

export const useGetUserInfo = (): UserStateType => {
  const userState = useUserStore((state: UserStoreType) => state.userState);
  const { username, nickname } = userState;
  return { username, nickname };
};

export const getUserInfo = (): UserStateType => {
  const { userState } = useUserStore.getState();
  const { username, nickname } = userState;
  return { username, nickname };
};

export type { UserStateType };
