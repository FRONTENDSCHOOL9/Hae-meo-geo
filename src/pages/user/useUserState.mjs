import { create } from "zustand";

const useUserState = create((set) => ({
  user: null,
  token: null,
  setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
}));

export default useUserState;
