import { useSelector } from 'react-redux';

import { StateType } from '@/app/store';
import { UserStateType } from '@/app/store/userReducer';

export const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StateType>((state) => state.user) as UserStateType;
  return { username, nickname };
};
