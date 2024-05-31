import { create } from "zustand";

const modalStore = create((set) => ({
  isShow: false,
  data: {},
  toggleModal: () => set((state) => ({ isShow: !state.isShow })),
  setModal: (obj) => set((state) => ({ data: obj, isShow: !state.isShow })),
}));
export default modalStore;
