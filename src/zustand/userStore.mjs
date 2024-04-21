import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser) => set(() => ({ user: newUser })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export default userStore;
