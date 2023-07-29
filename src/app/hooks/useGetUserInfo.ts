import useUserStore, { UserStoreType } from '@/app/store';

export const useGetUserInfo = () => {
  const userState = useUserStore((state: UserStoreType) => state.userState);
  const { username, nickname } = userState;
  return { username, nickname };
};
