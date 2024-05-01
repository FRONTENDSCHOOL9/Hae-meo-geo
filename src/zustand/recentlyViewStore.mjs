import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const recentlyViewStore = create(
  persist(
    (set, get) => ({
      recentlyView: null,
      setRecentlyView: () => set((state) => get()),
    }),
    {
      name: "recentlyView",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export default recentlyViewStore;
