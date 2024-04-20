import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const session = sessionStorage.getItem("saveUser");
console.log(JSON.parse(session));
const userStore = create(
  persist(
    (set) => ({
      // user: session !== null ? JSON.parse(session) : null,
      user: JSON.parse(session),
      setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
      // setUser: (newUser) => {
      //   set({ user: newUser });
      //   sessionStorage.setItem("saveUser", JSON.stringify(newUser));
      // },
    }),
    {
      name: "user",
      // getStorage: () => sessionStorage,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export default userStore;
