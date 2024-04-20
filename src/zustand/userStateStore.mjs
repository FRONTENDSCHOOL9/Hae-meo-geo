import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStateStore = create(
  persist(
    (set) => ({
      userState:
        sessionStorage.getItem("saveUser") !== null
          ? JSON.parse(sessionStorage.getItem("saveUser"))
          : null,
      setUserState: (newUserState) => {
        set({ userState: newUserState });
        sessionStorage.setItem("saveUser", JSON.stringify(newUserState));
      },
    }),
    {
      name: "userState",
      getStorage: () => sessionStorage,
    },
  ),
);

export default userStateStore;
