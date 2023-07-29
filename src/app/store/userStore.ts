import { create } from 'zustand';

export type UserStateType = {
  username: string;
  nickname: string;
};

export type UserStoreType = {
  userState: UserStateType;
  login: (user: UserStateType) => void;
  logout: () => void;
};

const INIT_STATE: UserStateType = { username: '', nickname: '' };

const useUserStore = create<UserStoreType>((set) => ({
  userState: INIT_STATE,
  login: (user: UserStateType) => set({ userState: user }),
  logout: () => set({ userState: INIT_STATE }),
}));

export default useUserStore;
