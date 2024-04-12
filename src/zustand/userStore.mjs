import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
}));

export default useUserStore;
