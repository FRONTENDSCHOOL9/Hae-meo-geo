import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const recentlyViewStore = create(
  persist(
    (set) => ({
      recentlyView: null,
      setRecentlyView: (obj) =>
        set((state) => {
          if (state.recentlyView) {
            // 10개 이상인 경우 가장 먼저 담긴 레시피 삭제
            if (state.recentlyView.length === 10) {
              state.recentlyView = state.recentlyView.filter(
                (_, idx) => idx !== 0,
              );
            }
            // 중복 레시피 삭제
            state.recentlyView = state.recentlyView.filter(
              (item) => item.name !== obj.name,
            );
            return { recentlyView: [obj, ...state.recentlyView] };
          } else {
            return { recentlyView: [obj] };
          }
        }),
    }),
    {
      name: "recentlyView",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export default recentlyViewStore;
